import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import SettingsComponent from "~/components/Supplier/SettingsComponent.vue";

describe("SettingsComponent", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("~/services/settingservices", async (importOriginal) => {
		const actual = await importOriginal()
    return {
			...actual,
      getesfrontstats: vi.fn().mockResolvedValue({
				data: {
					data: {data: {}}
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
		const actual = await importOriginal()
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
					data: {
						
					}
				}
			})
    };
  });
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
        params: {},
        path: "",
        query: {
          // @ts-ignore
          onboarding_stage: 2,
        },
        redirectedFrom: undefined,
      })),
    };
  });

	const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  it("renders", async () => {
    const component = render(SettingsComponent, {
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
        mocks: {},
      },
    });
		expect(screen.getByText("Profile information"))
		await waitFor(() =>
      fireEvent.change(screen.getByTestId("imgup"), {
        target: { files: [file] },
      })
    );
		screen.debug()
  });
});
