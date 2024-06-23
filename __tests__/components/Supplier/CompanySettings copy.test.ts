import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import CompanySettingsCopy from "~/components/Supplier/CompanySettings copy.vue";


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
  it("renders", async () => {
    const component = render(CompanySettingsCopy, {
      global: {
        plugins: [store],
      },
    });
		expect(screen.getByText("Company settings")).toBeTruthy();
		component.unmount();
  });
});
