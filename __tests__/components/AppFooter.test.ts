import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import AppFooter from "~/components/AppFooter.vue";
import { extraContent, navs, socials } from "~/utils/constants";

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
  it("renders", () => {
    const component = render(AppFooter, {
      global: {
        plugins: [store],
      },
    });
    expect(screen.getByText("Discover and buy chemicals, raw materials, ingredients, and commodities all in one place.")).toBeTruthy();
		// expect(component.html()).toMatchSnapshot()
		// component.unmount()
  });
});
