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
import PaymentMethod from "~/components/Supplier/payments/PaymentMethod.vue";
import { createStore } from "vuex";

describe("PaymentMethod", () => {
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

  const store = createStore({
    state: {},
    mutations: {
      setUser: vi.fn(),
    },
  });


  it("renders", async () => {
    const component = render(PaymentMethod, {
      props: {},
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [store],
        mocks: {},
      },
    });
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
