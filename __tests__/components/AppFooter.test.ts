import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";

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

describe("AppFooter", () => {
  it("renders", async () => {
    const component = render(AppFooter, {
      global: {
        plugins: [store],
      },
    });
    expect(screen.getByText("Discover and buy chemicals, raw materials, ingredients, and commodities all in one place.")).toBeTruthy();
		expect(component.html()).toMatchSnapshot()
  });
});
