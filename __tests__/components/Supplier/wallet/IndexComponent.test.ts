import { createTestingPinia } from "@pinia/testing";
import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import CompanySettingsCopy from "~/components/Supplier/CompanySettings copy.vue";
import IndexComponnent from "~/components/Supplier/wallet/IndexComponnent.vue";

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
        stubs:{
          VerificationBox:true
        }
      },
    });
    expect(screen.getByText("Wallet")).toBeTruthy();
    component.unmount();
  });
});
