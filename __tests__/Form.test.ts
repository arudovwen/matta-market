import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import * as vueRouter from "vue-router";
import Form from "~/components/Settlements/Form.vue";
import { getBanks } from "~/services/settlementservice";

const props = {
  detail: {
    bankName: "Arkham Bank", // Assuming props.detail has a bankName property
    // Other properties that might be needed for setValues
  },
};

const setFieldValue = vi.fn(); // Mocking form field setter function
const setValues = vi.fn(); // Mocking setValues function for setting form values

// Mocking getBanks
vi.mock("@/services/bankservices", async (importOriginal) => {
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
            // Add more banks as needed
          ],
        },
      },
    }),
  };
});

describe("Form", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({
    then: function <TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
      throw new Error("Function not implemented.");
    },
    catch: function <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<void | TResult> {
      throw new Error("Function not implemented.");
    },
    finally: function (onfinally?: (() => void) | null | undefined): Promise<void> {
      throw new Error("Function not implemented.");
    },
    [Symbol.toStringTag]: ""
  });

  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: vi.fn(),
        };
      },
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
    };
  });

  it("renders", async () => {
    const component = render(Form, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          isOpen: false,
          handleSuccess: vi.fn()
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

    // Wait for elements to be available
    await screen.findByText("Add Settlement Account"); // Adjust based on actual content

    expect(screen).toMatchSnapshot();

    component.unmount();
  });
});
