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
import * as vueRouter from "vue-router";
import IndexComponent from "~/components/Supplier/account/layout/IndexComponent.vue";
import { createStore } from "vuex";
import AccountType from "~/components/onboarding/AccountType.vue";

describe("ProjectGrid", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: vi.fn(),
        };
      },
      useRoute: vi.fn(),
    };
  });
  vi.spyOn(vueRouter, "useRoute").mockImplementation(() => ({
    fullPath: "",
    hash: "",
    matched: [],
    name: "",
    meta: {},
    params: {},
    path: "",
    query: {
      // @ts-ignore
      onboarding_stage: 1,
    },
    redirectedFrom: undefined,
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
				AccountType: "customer",
				userType: 0,
				accountType: 1
      }),
			userType: () => "admin"
    },
  });

  it("renders", async () => {
    const component = render(IndexComponent, {
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
