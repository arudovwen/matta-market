import { createTestingPinia } from "@pinia/testing";
import { render, screen, fireEvent } from "@testing-library/vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore } from "vuex";
import { retry } from "~/__mocks__/retry";
import Detail from "~/components/product/Detail.vue";

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

describe("Detail", () => {
  it("renders", async () => {
    const component = render(Detail, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  fullName: "Oduro Tolulope",
                  phoneNumber: "07036845422",
									businessId: "678987"
                },
              },
              products: {
                product: {
                  hidePrice: false,
                  gallery: [""],
                  manufacturer: "Stark Industries",
                  id: "678908",
                  name: "Mark 47",
                  packagesAvailable: [
                    {
                      package: { title: "Package One" },
                      size: 23,
                      unit: 200,
                      amount: 20,
                    },
                  ],
                  producer: { title: "Person" },
                  sampleAvailable: [],
									supplierId: "321234"
                },
              },
            },
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          isLoading: false,
        },
      },
    });
    expect(screen.getByText("Package One/23200 - ₦460")).toBeTruthy();
    expect(screen.getByText("Person")).toBeTruthy();
    expect(screen.getByText("Mark 47")).toBeTruthy();
    fireEvent.click(screen.getByText("Request quote"));
    fireEvent.click(screen.getByText("Add to cart"));
    await retry(() => expect(screen.getByTestId("step-header")).toBeTruthy());
    fireEvent.click(screen.getByText("Request sample"));
  });
});
describe("Detail", () => {
  it("renders", async () => {
    const component = render(Detail, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  fullName: "Oduro Tolulope",
                  phoneNumber: "07036845422",
									businessId: "098765"
                },
              },
              products: {
                product: {
                  hidePrice: false,
                  gallery: [""],
                  manufacturer: "Stark Industries",
                  id: "678908",
                  name: "Mark 47",
                  packagesAvailable: [
                    {
                      package: { title: "Package One" },
                      size: 23,
                      unit: 200,
                      amount: 20,
                    },
                  ],
                  producer: { title: "Person" },
                  sampleAvailable: [],
									supplierId: "5678"
                },
              },
            },
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          isLoading: false,
        },
      },
    });
    expect(screen.getByText("Package One/23200 - ₦460")).toBeTruthy();
    expect(screen.getByText("Person")).toBeTruthy();
    expect(screen.getByText("Mark 47")).toBeTruthy();
    fireEvent.click(screen.getByText("Request quote"));
    await retry(() => expect(screen.getByTestId("step-header")).toBeTruthy());
    fireEvent.click(screen.getByText("Request sample"));
  });
});

describe("Detail2", () => {
  it("renders", async () => {
    const component = render(Detail, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              products: {
              },
            },
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          isLoading: false,
        },
      },
    });
    fireEvent.click(screen.getByText("Request quote"));
		expect(screen.queryByTestId("step-header")).toBeNull()
  });
});
