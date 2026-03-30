import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import Side from "~/components/Supplier/order/confirmation/Side.vue";
import { confirmavailablilty } from "~/services/cartservice";
import { toast } from "vue3-toastify";

vi.mock("~/services/cartservice", () => ({
  confirmavailablilty: vi.fn(),
}));

vi.mock("vue3-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "123" },
  }),
}));

describe("Side.vue", () => {
  let wrapper;
  const mockOrder = {
    orderDetails: [
      { id: 1, product: "test product", quantity: 2, selectedPackage: "Box", itemTotal: 200 },
    ],
    orderTotal: 200,
  };
  const selectedPickup = ref(null);
  const order = ref(mockOrder);

  beforeEach(() => {
    vi.clearAllMocks();
    selectedPickup.value = null;
    
    wrapper = mount(Side, {
      global: {
        provide: {
          selectedPickup,
          order,
        },
        stubs: {
          AppButton: {
            template: '<button @click="$emit(\'click\')" :disabled="isDisabled">{{ text }}<span v-if="isLoading">Loading</span></button>',
            props: ["text", "isLoading", "isDisabled"],
          },
        },
        config: {
          globalProperties: {
            currencyFormat: (val) => `$${val}`,
          },
        },
      },
    });
  });

  it("renders order items and totals correctly", () => {
    expect(wrapper.text()).toContain("test product");
    expect(wrapper.text()).toContain("Qty: 2 Box");
    expect(wrapper.text()).toContain("$200");
  });

  it("shows info toast if no pickup location is selected", async () => {
    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    
    expect(toast.info).toHaveBeenCalledWith("Select a pickup location");
    expect(confirmavailablilty).not.toHaveBeenCalled();
  });

  it("handles successful order confirmation", async () => {
    selectedPickup.value = "location-1";
    confirmavailablilty.mockResolvedValue({ status: 200 });

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");

    expect(wrapper.vm.loading).toBe(true);
    expect(confirmavailablilty).toHaveBeenCalledWith({
      shippingAddressId: "location-1",
      orderItemId: 1,
      available: true,
    });

    await flushPromises();
    expect(toast.success).toHaveBeenCalledWith("Successful");
    expect(wrapper.vm.value).toBe(null);
  });

  it("handles unavailable product confirmation", async () => {
    selectedPickup.value = "location-1";
    confirmavailablilty.mockResolvedValue({ status: 200 });

    const buttons = wrapper.findAll("button");
    await buttons[1].trigger("click");

    expect(confirmavailablilty).toHaveBeenCalledWith(expect.objectContaining({
      available: false,
    }));
    
    await flushPromises();
    expect(toast.success).toHaveBeenCalled();
  });

  it("handles API error with 'Message' property", async () => {
    selectedPickup.value = "location-1";
    const errorResponse = {
      response: { data: { Message: "Out of stock" } },
    };
    confirmavailablilty.mockRejectedValue(errorResponse);

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    await flushPromises();

    expect(toast.error).toHaveBeenCalledWith("Out of stock, Contact us for assistance on your order");
    expect(wrapper.vm.loading).toBe(false);
  });

  it("handles API error with 'message' property", async () => {
    selectedPickup.value = "location-1";
    const errorResponse = {
      response: { data: { message: "Error occurred" } },
    };
    confirmavailablilty.mockRejectedValue(errorResponse);

    await wrapper.findAll("button")[0].trigger("click");
    await flushPromises();

    expect(toast.error).toHaveBeenCalledWith("Error occurred, Contact us for assistance on your order");
  });

  it("sets loading and value state during async call", async () => {
    selectedPickup.value = "location-1";
    let resolveApi;
    confirmavailablilty.mockReturnValue(new Promise((resolve) => { resolveApi = resolve; }));

    await wrapper.findAll("button")[0].trigger("click");
    
    expect(wrapper.vm.loading).toBe(true);
    expect(wrapper.vm.value).toBe(true);

    resolveApi({ status: 200 });
    await flushPromises();
    
    expect(wrapper.vm.value).toBe(null);
  });

  it("handles null order details in template safely", async () => {
    order.value = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".flex.justify-between").length).toBeGreaterThan(0);
  });
});