import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { ref } from "vue";
import Item from "@/components/Supplier/order/confirmation/Item.vue";

const EditOrderStub = {
  name: "EditOrder",
  template: '<div id="edit-order"></div>',
  props: ["detail"],
};

const IndexModalStub = {
  name: "IndexModal",
  template: '<div id="modal" v-if="isOpen"><slot name="content" /></div>',
  props: ["isOpen"],
};

vi.stubGlobal("useCartStore", vi.fn(() => ({
  cart: [],
})));

describe("Item.vue", () => {
  let wrapper;
  const currencyFormat = (val) => `₦${val?.toLocaleString() || 0}`;

  const createComponent = (props = {}) => {
    return mount(Item, {
      props,
      global: {
        provide: {
          currentCurrency: ref("₦"),
        },
        config: {
          globalProperties: {
            currencyFormat,
          },
        },
        stubs: {
          IndexModal: IndexModalStub,
          EditOrder: EditOrderStub,
        },
      },
    });
  };

  it("renders detail information correctly", () => {
    const detail = {
      product: "Chemical Compound",
      producer: "Acme Corp",
      selectedPackage: "25kg Bag",
      quantity: 10,
      itemTotal: 50000,
      productImg: "/test-img.png",
    };
    wrapper = createComponent({ detail });

    expect(wrapper.find("img").attributes("src")).toContain("/test-img.png");
    expect(wrapper.text()).toContain("Chemical Compound");
    expect(wrapper.text()).toContain("Acme Corp");
    expect(wrapper.text()).toContain("25kg Bag");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).toContain("₦50,000");
  });

  it("renders default values when detail fields are missing", () => {
    wrapper = createComponent({ detail: {} });
    expect(wrapper.find("img").attributes("src")).toContain("/images/imgplace.png");
    expect(wrapper.text()).toContain("n/a");
  });

  it("handles the modal state and interactions", async () => {
    const detail = { product: "Test" };
    wrapper = createComponent({ detail });

    expect(wrapper.find("#modal").exists()).toBe(false);

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#modal").exists()).toBe(true);
    
    const editOrder = wrapper.findComponent(EditOrderStub);
    expect(editOrder.exists()).toBe(true);
    expect(editOrder.props("detail")).toEqual(detail);

    await wrapper.findComponent(IndexModalStub).vm.$emit("togglePopup");
    expect(wrapper.vm.open).toBe(false);

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();
    
    await wrapper.findComponent(EditOrderStub).vm.$emit("close");
    expect(wrapper.vm.open).toBe(false);
  });
});