import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import PaymentMethods from "~/components/Supplier/PaymentMethods.vue";
import { getProducers, getSupplierProducts } from "~/services/productservices";
import { retry } from "~/__mocks__/retry";
import { storefrontorders } from "~/services/storefrontservice";
import { getInvites, getRoles } from "~/services/userservices";
import { email } from "@vuelidate/validators";
import { getWalletDetails } from "~/services/walletservice";

describe("PaymentMethods", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  vi.mock("~/services/walletservice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getWalletDetails: vi.fn().mockResolvedValue({
        data: {
          data: {
            walletBalance: 3000000,
            bankName: "Arkham Bank",
            accountName: "Bruce Wayne",
            accountNumber: "2138764739",
          },
        },
      }),
    };
  });

  it("renders", async () => {
    const component = render(PaymentMethods, {
      props: {},
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
              },
            },
          }),
        ],
        mocks: {
					route: {
						meta: {
							title: ""
						}
					}
				},
      },
    });
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
