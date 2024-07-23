// InviteMembers.test.js
import { mount } from "@vue/test-utils";
import InviteMembers from "~/components/onboarding/company/InviteMembers.vue";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Plugin } from "vue";
import Vuex, { createStore, mapActions } from "vuex";

const mockRoutePush = vi.fn();
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
vi.mock("~/services/userservices", () => ({
  getRoles: vi.fn().mockResolvedValue({
    data: [],
  }),
}));
vi.mock("~/services/onboardingservices", () => ({
  inviteUsers: vi.fn().mockResolvedValue({
    data: {
      bannerUrl: "/images/test-banner.png",
      logo: "/images/test-logo.png",
      storeName: "Test Store",
    },
  }),
}));
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
      params: {
        category: "testcat",
      },
      path: "",
      query: {
        // @ts-ignore
        onboarding_stage: 2,
      },
      redirectedFrom: undefined,
    })),
  };
});
describe("InviteMembers", () => {
    
  it("renders correctly", async () => {
    const wrapper = mount(InviteMembers, {
      global: {
        plugins: [store],
      },
    });
    expect(screen).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toBe("Invite your team members");
    expect(wrapper.find("button").text()).toBe("Add new member");
  });
});
