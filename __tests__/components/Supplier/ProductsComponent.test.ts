import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import ProductsComponent from "~/components/Supplier/ProductsComponent.vue";
import { getProducers, getSupplierProducts } from "~/services/productservices";
import { retry } from "~/__mocks__/retry";

describe("ProductsComponent", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  vi.mock("~/services/productservices", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getProducers: vi.fn().mockResolvedValue({
        data: {
          data: {
            data: [{ title: "One" }, { title: "Two" }, { title: "Three" }],
          },
        },
      }),
      getSupplierProducts: vi.fn().mockResolvedValue({
        data: {
          data: {
            data: [
              {
                id: "3379915000005147001",
                title: "Minority PrAkane",
                seller: null,
                price: 1500,
                optionCount: 2,
                packString: [
                  {
                    package: {
                      id: "5bd37333-2919-4fd5-a202-3b2028bbe698",
                      title: "Plastic drum",
                    },
                    unit: "m3",
                    size: 100,
                    color: "Blue",
                    purity: "100",
                    amount: 1500,
                    purchaseAmount: 0,
                    isAvailable: false,
                  },
                  {
                    package: {
                      id: "afbcc156-b26c-4b96-8277-2b4f05125ae0",
                      title: "Metal drum",
                    },
                    unit: "m3",
                    size: 10,
                    color: "Green",
                    purity: "99",
                    amount: 1200,
                    purchaseAmount: 0,
                    isAvailable: true,
                  },
                ],
                pack: {
                  id: "5bd37333-2919-4fd5-a202-3b2028bbe698",
                  title: "Plastic drum",
                },
                packType: "Plastic drum",
                logo: null,
                converPhoto:
                  "https://dev.gateway.matta.trade/uploads/9e905f49-50d4-40ae-9b40-fa797d255756.jpg",
                isAvailable: true,
                customerId: "3379915000002081001",
                manufacturer: "BASF",
                unit: "m3",
                liked: false,
                hidePrice: false,
                created: null,
                sku: "min/p&p/tes/sxn/riq/eng/100kg",
                pickUpLocationId: null,
              },
              {
                id: "3379915000005141005",
                title: "Fresprod",
                seller: null,
                price: 200,
                optionCount: 3,
                packString: [
                  {
                    package: {
                      id: "1d8f8bd1-ff6c-4a40-8905-cba0da1e84b4",
                      title: "Metal drum",
                    },
                    unit: "truck",
                    size: 90,
                    color: null,
                    purity: null,
                    amount: 200,
                    purchaseAmount: 0,
                    isAvailable: false,
                  },
                  {
                    package: {
                      id: "c95eb83e-1927-4fd2-be97-b6e100b94808",
                      title: "Plastic drum",
                    },
                    unit: "g",
                    size: 90,
                    color: "",
                    purity: "",
                    amount: 4000,
                    purchaseAmount: 0,
                    isAvailable: true,
                  },
                  {
                    package: {
                      id: "c2e6a099-af43-4cd6-9311-1788528fe7cb",
                      title: "Cylinder",
                    },
                    unit: "g",
                    size: 900,
                    color: "",
                    purity: "",
                    amount: 900,
                    purchaseAmount: 0,
                    isAvailable: true,
                  },
                ],
                pack: {
                  id: "1d8f8bd1-ff6c-4a40-8905-cba0da1e84b4",
                  title: "Metal drum",
                },
                packType: "Metal drum",
                logo: null,
                converPhoto:
                  "https://dev.gateway.matta.trade/uploads/47d3e928-4ffc-4b6d-bd6b-88ff0ee95c35.jpg",
                isAvailable: true,
                customerId: "3379915000003144001",
                manufacturer: "BASF",
                unit: "truck",
                liked: false,
                hidePrice: false,
                created: null,
                sku: "fre/a&af/agr/foa/jiu/ich/90truck",
                pickUpLocationId: null,
              },
            ],
          },
        },
      }),
    };
  });

  it("renders", async () => {
    const component = render(ProductsComponent, {
      props: {},
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
		// await waitForElementToBeRemoved(screen.getByTestId("spinner"))
		// ["product", "created", "views", "orders", ""]
		// await retry(() => expect(screen.getByText("views")).toBeTruthy())
		expect(screen).toMatchSnapshot();
		
    component.unmount();
  });
});
