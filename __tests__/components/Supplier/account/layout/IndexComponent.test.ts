import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { vi, describe, it, expect } from "vitest";
import * as authServices from "~/services/authservices";
import * as vueRouter from "vue-router";
import IndexComponent from "~/components/Supplier/account/layout/IndexComponent.vue";
import { createStore } from "vuex";

describe("IndexComponent", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("vue-router", () => ({
    RouterView: {},
    useRouter: () => ({
      push: vi.fn(),
    }),
    useRoute: vi.fn(),
  }));

  vi.spyOn(vueRouter, "useRoute").mockReturnValue({
    fullPath: "",
    hash: "",
    matched: [],
    name: "",
    meta: {},
    params: {},
    path: "",
    query: {
      onboarding_stage: 1,
    },
    redirectedFrom: undefined,
  });

  const store = createStore({
    state: {
      auth: {
        loggedUser: {
          fullName: "Oduro Tolulope",
          phoneNumber: "07036845422",
          AccountType: "customer",
          userType: 0,
          accountType: 1,
        },
      },
    },
  });

  it("renders IndexComponent correctly", async () => {
    const component = render(IndexComponent, {
      global: {
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
        stubs: {
          RouterLink: RouterLinkStub,
          SideComponent: true,
          MainComponent: true
        },
        mocks: {
          $store: store,
        },
      },
    });

    await vi.waitFor(() => screen.getByTestId("index-component"));

    expect(screen.getByTestId("index-component")).toMatchSnapshot();

    component.unmount();
  });
});
