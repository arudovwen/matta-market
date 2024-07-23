import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";
import { Listbox } from '@headlessui/vue';

import AppHeader from "~/components/AppHeader.vue";
import CartCounter from "~/components/Information/CartCounter.vue";

const store = createStore({
  state: {
    loggedUser: {
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    },
  },
  getters: {
    loggedUser: () => ({
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    }),
  },
  actions: {
    handleAddToCart: vi.fn().mockResolvedValue({ status: true }),
  },
});

const product = ref({
  packagesAvailable: [
    {
      package: { title: "Package 1", id: 1 },
      size: "Small",
      unit: "kg",
      amount: 100,
    },
    {
      package: { title: "Package 2", id: 2 },
      size: "Large",
      unit: "kg",
      amount: 200,
    },
  ],
  hidePrice: false,
  id: 1,
  name: "Product Name",
  productBrandName: "Brand Name",
  supplierId: 1,
  manufacturer: "Manufacturer",
});

describe("CartCounter", () => {
  it("renders", async () => {
    const component = render(CartCounter, {
      global: {
        plugins: [store],
        provide: {
          product,
          supplier: "Supplier Name",
        },
      },
      props: {
        isAvailable: true,
      },
    });
		await fireEvent.click(screen.getByTestId("add-to-cart"))
		expect(screen).toMatchSnapshot()
    component.unmount();
  });
});
