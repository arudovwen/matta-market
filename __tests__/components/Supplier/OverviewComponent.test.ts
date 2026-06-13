import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import DashboardHeader from "~/components/DashboardHeader.vue";
import { createTestingPinia } from "@pinia/testing";
import OverviewComponent from "~/components/Supplier/OverviewComponent.vue";

vi.mock("ofetch", () => ({
  $fetch: vi.fn(() => Promise.resolve({})),
  ofetch: vi.fn(() => Promise.resolve({})),
}));

describe("OverviewComponent", () => {
 
  vi.mock("~/services/settingservices", async () => {

    return {
   
      getesfrontstats: vi.fn().mockResolvedValue({
        data: {
          data: {}
        }
      }),
      getstorefronttrending: vi.fn().mockResolvedValue({
        data: {
          data: []
        }
      }),
    };
  });

  vi.mock("~/services/chartservice", async () => {

    return {

      getorderchart: vi.fn().mockResolvedValue({
        status: 200,
        data: {
          data: {
            data: [
              {
                chartrecords: []
              },
              {
                chartrecords: []
              },
            ],
          },
        },
      }),
      getchart: vi.fn().mockResolvedValue({
        data: {
          data: {}
        }
      })
    };
  });

  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => ({
        push: vi.fn(),
      }),
      useRoute: () => ({
        fullPath: "",
        hash: "",
        matched: [],
        name: "",
        meta: {},
        params: {},
        path: "",
        query: {
          onboarding_stage: 2,
        },
        redirectedFrom: undefined,
      }),
    };
  });

  it("renders", async () => {
    render(OverviewComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          VerificationBox: true
        },
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
                userInfo: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
              },
            },
          }),
        ],
      },
    });

    await screen.findByText("Your current sales summary and activity.");

    expect(screen.getByText("Your current sales summary and activity.")).toBeTruthy();
  });
});
