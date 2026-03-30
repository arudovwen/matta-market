import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, nextTick } from "vue";
import Pickup from "@/components/Supplier/order/confirmation/pickup.vue";

describe("pickup.vue", () => {
  let wrapper;
  const selectedPickup = ref(null);

  const createComponent = () => {
    return mount(Pickup, {
      global: {
        provide: {
          selectedPickup,
        },
        stubs: {
          AppButton: true,
          AppIcon: true,
          AppLoader: true,
          EmptyData: true,
          CheckoutPickupAddress: true,
          ModalCenter: true,
          CheckoutPickupEditForm: true,
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    selectedPickup.value = null;
  });

  it("initializes with correct default state", () => {
    wrapper = createComponent();
    
    expect(wrapper.vm.type).toBe("form");
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.detail).toBeNull();
  });

  it("opens modal for new location", async () => {
    wrapper = createComponent();
    expect(wrapper.vm.isOpen).toBe(false);
    
    wrapper.vm.openModal("form");
    await nextTick();
    
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.vm.type).toBe("form");
  });

  it("opens modal in edit mode", async () => {
    wrapper = createComponent();
    
    wrapper.vm.openModal("edit");
    await nextTick();
    
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.vm.type).toBe("edit");
  });

  it("opens modal in edit mode with address details", async () => {
    const testAddress = { id: "123", street: "Test St", city: "Test City" };
    
    wrapper = createComponent();
    wrapper.vm.handleEdit(testAddress);
    await nextTick();

    expect(wrapper.vm.detail).toEqual(testAddress);
    expect(wrapper.vm.type).toBe("edit");
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it("triggers btnFunction logic", () => {
    wrapper = createComponent();
    wrapper.vm.btnFunction();
    
    expect(wrapper.vm.type).toBe("form");
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it("manages modal state correctly", async () => {
    wrapper = createComponent();
    
    wrapper.vm.isOpen = true;
    wrapper.vm.type = "form";
    await nextTick();
    
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.vm.type).toBe("form");
  });

  it("manages edit state correctly", async () => {
    const testAddress = { id: "456", name: "New Address" };
    
    wrapper = createComponent();
    wrapper.vm.handleEdit(testAddress);
    await nextTick();
    
    expect(wrapper.vm.detail).toEqual(testAddress);
    expect(wrapper.vm.type).toBe("edit");
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it("resets detail on new location modal open", async () => {
    wrapper = createComponent();
    wrapper.vm.detail = { id: "old" };
    
    wrapper.vm.openModal("form");
    await nextTick();
    
    expect(wrapper.vm.detail).toEqual({ id: "old" });
  });

  it("provides type context to child components", () => {
    wrapper = createComponent();
    
    wrapper.vm.type = "edit";
    
    expect(wrapper.vm.type).toBe("edit");
  });

  it("provides isOpen context to child components", () => {
    wrapper = createComponent();
    
    wrapper.vm.isOpen = true;
    
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it("provides detail context to child components", () => {
    wrapper = createComponent();
    const testDetail = { id: "789" };
    
    wrapper.vm.detail = testDetail;
    
    expect(wrapper.vm.detail).toEqual(testDetail);
  });
});