import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import AppHeader from "~/components/AppHeader.vue";
import TopBanner from "~/components/Information/TopBanner.vue";
import { createWebHistory } from "vue-router";
import * as vueRouter from "vue-router"

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

describe("TopBanner", () => {
  it("renders", async () => {
    const product = {
      name: "Test Product",
      liked: false,
      hidePrice: false,
      gallery: [],
      packagesAvailable: [],
      packages: [],
    };
    const defaultPackage = { amount: 100, unit: "Kg" };
    const supplier = { logo: "", companyName: "" };

    const store = createStore({
      getters: {
        isLoggedIn: () => true,
        userId: () => 1,
      },
    });

    vi.mock("vue-router", () => {
      return {
        RouterView: {},
        useRouter: () => {
          return {
            push: vi.fn,
          };
        },
        useRoute: vi.fn,
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
        onboarding_stage: 2,
      },
      redirectedFrom: undefined,
    }));

    const component = render(TopBanner, {
      global: {
        plugins: [store],
				stubs: {
					RouterLink: RouterLinkStub
				},
        provide: {
          product,
          defaultPackage,
          supplier,
        },
      },
    });
		screen.debug()
    component.unmount();
  });
});
