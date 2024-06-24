import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";
import GoogleTranslateSelect from "@google-translate-select/vue3";
import AppHeader from "~/components/AppHeader.vue";

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

// Mock GoogleTranslateSelect component
vi.mock("@google-translate-select/vue3", () => ({
  default: {
    name: "GoogleTranslateSelect",
    props: ["fetch-browser-language", "trigger", "languages"],
    template: "<div><slot></slot></div>",
  },
}));
describe("AppHeader", () => {
  it("renders the Google Translate component correctly", () => {
    const wrapper = mount(AppHeader, {
      global: {
        components: {
          GoogleTranslateSelect,
        },
      },
    });

    // Check if the GoogleTranslateSelect component is rendered
    const googleTranslate = wrapper.findComponent(GoogleTranslateSelect);
    expect(googleTranslate.exists()).toBe(true);
  });

  it("renders", async () => {
    const component = render(AppHeader, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    expect(screen.getByTestId("deal-container").classList[0]).toBe(
      "bg-[#1849A9]"
    );
    expect(component.html()).toContain(
      "Get N50,000 off when you sign up and make your first purchase."
    );
    await fireEvent.click(screen.getByText("Markets"));
    await fireEvent.click(screen.getByText("Applications"));
    await fireEvent.click(screen.getByText("Request a product"));
    component.unmount();
  });
});
