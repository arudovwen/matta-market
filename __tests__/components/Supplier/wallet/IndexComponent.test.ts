import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";
import IndexComponnent from "~/components/Supplier/wallet/IndexComponnent.vue";

// Mock wallet services to prevent unresolved async tasks after teardown
vi.mock("~/services/walletservice", () => ({
  getLedgerTransactions: vi.fn(() =>
    Promise.resolve({ status: 200, data: { data: [], totalCount: 0 } })
  ),
  getWalletBalance: vi.fn(() =>
    Promise.resolve({ status: 200, data: { data: 0 } })
  ),
}));

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

describe("CompanySettings copy", () => {
  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: vi.fn,
        };
      },
      useRoute: vi.fn().mockImplementation(() => ({
        fullPath: "",
        hash: "",
        matched: [],
        name: "",
        meta: {},
        params: {},
        path: "",
        query: {
          // @ts-ignore
          onboarding_stage: 2,
        },
        redirectedFrom: undefined,
      })),
    };
  });

  it("renders", async () => {
    const component = render(IndexComponnent, {
      global: {
        plugins: [
          store,
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                  businessUserType: "admin",
                },
              },
            },
          }),
        ],
        stubs: {
          VerificationBox: true,
          SideBox: true,
          SupplierWalletTransactionPage: true,
        },
      },
    });

    // Wait for all async operations (service calls) to complete before assertions
    await flushPromises();

    expect(screen.getByText("Wallet")).toBeTruthy();

    component.unmount();

    // Allow any remaining microtasks to settle before environment teardown
    await flushPromises();
  });
});
