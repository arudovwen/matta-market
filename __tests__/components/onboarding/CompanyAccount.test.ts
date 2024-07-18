import { render, screen } from "@testing-library/vue";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
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
describe("CompanyAccount", () => {
  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: mockRoutePush,
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
  vi.mock("~/services/productservices", async () => {
    return {
      getProfile: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
    };
  });
  vi.mock("~/services/onboardingservices", async () => {
    return {
      uploadfile: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      setOnboardingcomplete: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      updatePersonalInfo: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
    };
  });
  vi.mock("~/services/settingservices", async () => {
    return {
      getCompanyProfile: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      getProfile: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      updateCompanyProfile: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      updateDocuments: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
      updateDirectors: vi.fn().mockResolvedValue({
        status: 200,
        data: { data: {} },
      }),
    };
  });
  it("Renders without error", () => {
    const component = render(CompanyAccount, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
          OnboardingCompanyInformation: true,
          OnboardingCompanyDirectors: true,
          OnboardingCompanyProfile: true,
          OnboardingCompanyDocuments: true,
          OnboardingCompanySideBar: true,
          OnboardingLayoutTopBar: true,
        },
      },
    });
    expect(screen.getByTestId("account")).toBeTruthy();
    component.unmount();
  });
});
