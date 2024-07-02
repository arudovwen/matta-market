import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import Form from "~/components/Settlements/Form.vue";

// Mocking getBanks
vi.mock("~/services/settlementservice", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    getBanks: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          responseBody: [
            { name: "Bank A", code: "001" },
            { name: "Bank B", code: "002" },
          ],
        },
      },
    }),
  };
});

describe("Form", () => {
  // Mock authServices.logOut
  vi.spyOn(authServices, "logOut").mockResolvedValue({});

  // Mock vue-router functions
  vi.mock("vue-router", () => ({
    RouterView: {},
    useRouter: () => ({
      push: vi.fn(),
    }),
    useRoute: vi.fn().mockReturnValue({
      fullPath: "",
      hash: "",
      matched: [],
      name: "",
      meta: {},
      params: {},
      path: "",
      query: {
        onboarding_stage: 1,
      },
      redirectedFrom: undefined,
    }),
  }));

  it("renders", async () => {
    const component = render(Form, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          isOpen: false,
          handleSuccess: vi.fn(),
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

    // Wait for specific content to appear asynchronously
    await screen.findByText("Add Settlement Account");

    expect(screen).toMatchSnapshot();

    component.unmount();
  });
});
