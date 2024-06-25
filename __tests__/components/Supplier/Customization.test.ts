import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import MyOrders from "~/components/Supplier/MyOrders.vue";
import type { procurementorderdetails } from "~/services/orderservice";
import Customization from "~/components/Supplier/Customization.vue";
import userEvent from "@testing-library/user-event";

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
});

vi.mock("~/services/orderservice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    procurementorders: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            product: "Metal rod",
            soldBy: "Some Guy",
						amountWithTax: 100000,
            shippingName: "New Shippng",
            shippingAddress: "10007 Mountain Drive",
						orderNumber: "456789"
          }
        ],
        totalCount: 1,
      },
    }),
    procurementorderdetails: vi.fn().mockResolvedValue({
      status: 200,
      data: {
				orderDate: "12/01/24",
				orderTotalWithTax: 300000,
				orderTotal: 10000,
				shippingTotal: 20000,
				discountValue: 20000,
				orderDetails: [
					{
						product: "One Thing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 6
					},
					{
						product: "Another Thing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 0
					},
					{
						product: "The Thing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 1
					},
					{
						product: "SomeThing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 2
					},
					{
						product: "NoThing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 3
					},
					{
						product: "AnyThing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 4
					},
					{
						product: "ThatThing",
						quantity: 20,
						itemTotal_with_tax: 20000,
						orderItemStatus: 5
					},
				]
      },
    }),
  };
});

vi.mock("~/services/userservices", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		updateVendorInfo: vi.fn().mockResolvedValue({status: 200})
	}
})

describe("MyOrders", () => {
  it("renders", async () => {
    const component = render(Customization, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
		await userEvent.type(screen.getAllByPlaceholderText("")[0], "NewVal")
		await userEvent.click(screen.getByText("Save"));
		screen.debug();
		component.unmount();
  });
});
