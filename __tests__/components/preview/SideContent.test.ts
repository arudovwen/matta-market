import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import AppHeader from "~/components/AppHeader.vue";
import ProductContent from "~/components/preview/ProductContent.vue";
import SideContent from "~/components/preview/SideContent.vue";
import { email } from "@vuelidate/validators";

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

describe("SideContent", () => {
	vi.mock("~/services/productservices", async () => {
		return {
	
		  getProducers: vi.fn().mockResolvedValue({
			status: 200,
			data: {
			  data: [
				{
				  product: "Metal rod",
				  soldBy: "Some Guy",
				  amountWithTax: 100000,
				  shippingName: "New Shipping",
				  shippingAddress: "10007 Mountain Drive",
				  orderNumber: "456789",
				},
			  ],
			  totalCount: 1,
			},
		  }),
		  getsupplier: vi.fn().mockResolvedValue({
			status: 200,
			data: {},
		  }),
		};
	  });
  it("renders", async () => {
    const component = render(SideContent, {
      global: {
        plugins: [store],
				stubs: {
					RouterLink : RouterLinkStub
				},
				provide: {
					product: {
						gallery: [],
						propertyItems: {
							technical: ""
						},
						productExperts: [{
							photo: "",
							name: "Tyt4n",
							role: "admin",
							email: "tyt4@test.com",
							phone: "1234567891011"
						}]
					}
					// producer: ref(null),
					// supplier: ref(null)
				}
      },
    });
		expect(screen.getByText("Tyt4n")).toBeTruthy()
		component.unmount();
  });
});
