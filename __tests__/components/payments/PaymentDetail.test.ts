import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import AppHeader from "~/components/AppHeader.vue";
import ProductContent from "~/components/preview/ProductContent.vue";
import SideContent from "~/components/preview/SideContent.vue";
import { email } from "@vuelidate/validators";
import PaymentDetail from "~/components/payments/PaymentDetail.vue";
import { retry } from "~/__mocks__/retry";
import * as auth from "~/services/authservices";


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
	// @ts-ignore
	vi.spyOn(auth, "loginUser").mockResolvedValue({
		status : 200,
		data: {
			data: {
				fullName: "Oduro Tolulope",
				phoneNumber: "07036845422",
			}
		}
	})
  it("renders", async () => {
    const component = render(PaymentDetail, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          product: {
            gallery: [],
            propertyItems: {
              technical: "",
            },
            productExperts: [
              {
                photo: "",
                name: "Tyt4n",
                role: "admin",
                email: "tyt4@test.com",
                phone: "1234567891011",
              },
            ],
          },
        },
      },
    });
    await fireEvent.click(screen.getAllByTestId("iconn")[0]);
    await fireEvent.click(screen.getByText("Add new payment method"));
    await retry(() => screen.getByTestId("mark-default"));
    expect(screen.getAllByText("Add new payment method").length).toBe(2);
    await fireEvent.input(screen.getByTestId("card-number-input"), {
      target: { value: "12345678910111213" },
    });
    await fireEvent.input(screen.getByTestId("cvv-input"), {target: {value: "327"}});
    await fireEvent.input(screen.getByTestId("exp"), {target: {value: "03/27"}});

    await fireEvent.click(screen.getByText("Submit"));
    
    component.unmount();
  });
});
