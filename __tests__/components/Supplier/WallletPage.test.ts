import { render, screen, waitForElementToBeRemoved } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { vi, describe, it, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import WalletPage from "~/components/Supplier/WalletPage.vue";
import { getWalletDetails } from "~/services/walletservice";

describe("WalletPage", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("~/services/walletservice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getWalletDetails: vi.fn().mockResolvedValue({
        data: {
          walletBalance: 3000000,
          bankName: "Arkham Bank",
          accountName: "Bruce Wayne",
          accountNumber: "2138764739",
        },
      }),
    };
  });

  it("renders", async () => {
    const component = render(WalletPage, {
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
      },
    });

    // await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    expect(screen).toMatchSnapshot();

    component.unmount();
  });
});
