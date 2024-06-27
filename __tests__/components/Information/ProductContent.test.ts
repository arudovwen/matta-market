import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import AppHeader from "~/components/AppHeader.vue";
import ProductContent from "~/components/Information/ProductContent.vue";

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

describe("ProductContent", () => {
  it("renders", async () => {
    const component = render(ProductContent, {
      global: {
        plugins: [store],
				stubs: {
					RouterLink : RouterLinkStub
				},
				provide: {
					product: {
						gallery: [],
						propertyItems: {
							technical: ""
						}
					}
				}
      },
    });
		expect(screen.getByText("overview")).toBeTruthy()
		component.unmount();
  });
});
