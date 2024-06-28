import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import DashboardHeader from "~/components/DashboardHeader.vue";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import OverviewComponent from "~/components/Supplier/OverviewComponent.vue";
import {
  getesfrontstats,
  getstorefronttrending,
} from "~/services/settingservices";
import { getchart, getorderchart } from "~/services/chartservice";

describe("OverviewComponent", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("~/services/settingservices", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
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

  vi.mock("~/services/chartservice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
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
        },
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
              },
            },
          }),
        ],
      },
    });

    await screen.findByText("Welcome back, Bruce");

    expect(screen.getByText("Welcome back, Bruce")).toBeTruthy();
  });
});
