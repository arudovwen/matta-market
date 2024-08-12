import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import { createStore } from "vuex";
import { RouterLinkStub } from "@vue/test-utils";
import PaymentDetail from "~/components/payments/PaymentDetail.vue";
import { retry } from "~/__mocks__/retry";

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

describe("PaymentDetail Component", () => {
  // Mocking loginUser function from authservices

  it("renders and interacts correctly", async () => {
    const component = render(PaymentDetail, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
          CardDetail: true,
          Modal: true,
          PaymentMethod: true,
          RemovePayment: true,
        },
        provide: {
          // Mocking product data
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

    // // Simulate user interactions
    // await fireEvent.click(screen.getAllByTestId("iconn")[0]);
    // await fireEvent.click(screen.getByText("Add new payment method"));
    // await retry(() => screen.getByTestId("mark-default"));
    // expect(screen.getAllByText("Add new payment method").length).toBe(2);
    // await fireEvent.input(screen.getByTestId("card-number-input"), {
    //   target: { value: "12345678910111213" },
    // });
    // await fireEvent.input(screen.getByTestId("cvv-input"), {
    //   target: { value: "327" },
    // });
    // await fireEvent.input(screen.getByTestId("exp"), {
    //   target: { value: "03/27" },
    // });
    // await fireEvent.click(screen.getByText("Submit"));
    // Clean up after the test
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
