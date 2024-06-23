import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import CompanySettings from "~/components/Supplier/CompanySettings.vue";
import settings from "~/pages/company/settings.vue";


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

describe("CompanySettings", () => {
  it("renders", async () => {
    const component = render(settings, {
      global: {
        plugins: [store],
      },
    });
  });
});
