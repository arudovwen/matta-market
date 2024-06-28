
import Vuex, { createStore, mapActions } from "vuex";
import CompanySettings from "~/components/Supplier/CompanySettings.vue";
import settings from "~/pages/company/settings.vue";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";
import Stepper from "@/components/Stepper.vue";
import OnboardingCompanyInformation from "@/components/onboarding/company/Information.vue";
import OnboardingCompanyDocuments from "@/components/onboarding/company/Documents.vue";
import OnboardingCompanyDirectors from "@/components/onboarding/company/Directors.vue";
import AppLoader from "@/components/AppLoader.vue";
import { getCompanyProfile } from "@/services/settingservices";
import { useAuthStore } from "@/stores/auth";

vi.mock("@/services/settingservices");
vi.mock("@/stores/auth");

const routes = [
  { path: '/', component: CompanySettings }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const mockAuthStore = {
  userInfo: {
    onboardingPageStatus: true,
  },
};

const mockCompanyProfile = {
  status: 200,
  data: {
    data: {
      companyDocuments: [
        {
          urls: [],
          url: "http://example.com/doc1",
        },
      ],
    },
  },
};

describe("CompanySettings.vue", () => {
  beforeEach(() => {
    getCompanyProfile.mockResolvedValue(mockCompanyProfile);
    useAuthStore.mockReturnValue(mockAuthStore);
  });

  it("renders correctly", async () => {
    render(CompanySettings, {
      global: {
        components: {
          HeaderComponent,
          Stepper,
          OnboardingCompanyInformation,
          OnboardingCompanyDocuments,
          OnboardingCompanyDirectors,
          AppLoader,
        },
      },
    });

    expect(screen.getByText("Company settings")).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    });

    // Check for steps
    expect(screen.getByText("Company details")).toBeTruthy();
    expect(screen.getByText("Documents")).toBeTruthy();
    expect(screen.getByText("Directors")).toBeTruthy();
  });

  it("renders OnboardingCompanyDocuments when active is 2", async () => {
    render(CompanySettings, {
      global: {
        components: {
          HeaderComponent,
          Stepper,
          OnboardingCompanyInformation,
          OnboardingCompanyDocuments,
          OnboardingCompanyDirectors,
          AppLoader,
        },
        provide: {
          active: 2,
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    });

    expect(screen.getByText("Documents")).toBeTruthy();
  });

  it("renders Company settings when active is 3", async () => {
    render(CompanySettings, {
      global: {
        components: {
          HeaderComponent,
          Stepper,
          OnboardingCompanyInformation,
          OnboardingCompanyDocuments,
          OnboardingCompanyDirectors,
          AppLoader,
        },
        provide: {
          active: 3,
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    });

    expect(screen.getByText("Company settings")).toBeTruthy();
  });

  it("shows AppLoader when isLoading is true", async () => {
    render(CompanySettings, {
      global: {
        components: {
          HeaderComponent,
          Stepper,
          OnboardingCompanyInformation,
          OnboardingCompanyDocuments,
          OnboardingCompanyDirectors,
          AppLoader,
        },
        provide: {
          isLoading: true,
        },
      },
    });

    expect(screen.getByTestId("spinner")).toBeTruthy();
  });

  it("calls getData on mount", async () => {
    render(CompanySettings, {
      global: {
        components: {
          HeaderComponent,
          Stepper,
          OnboardingCompanyInformation,
          OnboardingCompanyDocuments,
          OnboardingCompanyDirectors,
          AppLoader,
        },
      },
    });

    await waitFor(() => {
      expect(getCompanyProfile).toHaveBeenCalled();
    });
  });
});
