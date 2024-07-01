import { render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import IndexComponent from "~/components/Dashboard/layout/IndexComponent.vue";

describe("IndexComponent", () => {
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
  vi.mock("~/services/settingservices", () => ({
    getCompanyProfile: vi.fn().mockResolvedValue({
      data: {
        bannerUrl: "/images/test-banner.png",
        logo: "/images/test-logo.png",
        storeName: "Test Store",
      },
    }),
  }));
  it("Should render without error", () => {
    render(IndexComponent, {
      global: {
        stubs: {
          DashboardLayoutSideComponent: true,
          DashboardLayoutMainComponent: true,
        },
        provide: {
          company: ref(null),
        },
      },
    });
    expect(screen).toMatchSnapshot();
  });
});
