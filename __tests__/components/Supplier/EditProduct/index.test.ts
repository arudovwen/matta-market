import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import EditProduct from "~/components/Supplier/EditProduct/index.vue";
import * as vueRouter from "vue-router";

const store = useProductStore();

const form = {
  productQuestions: [],
  tags: [],
  productExperts: [],
};

vi.mock("vue-router", () => {
  return {
    RouterView: {},
    useRouter: () => {
      return {
        push: vi.fn,
      };
    },
    useRoute: vi.fn,
  };
});

vi.spyOn(vueRouter, "useRoute").mockImplementationOnce(() =>
  reactive({
    fullPath: "",
    hash: "",
    matched: [],
    name: "",
    meta: {},
    params: {},
    path: "",
    query: {
      // @ts-ignore
      id: "4567",
      stage: "1",
    },
    redirectedFrom: undefined,
  })
);

vi.mock("~/services/productservices", async () => {
  return {
    getFeaturedManufacturer: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          data: [
            {
              product: "Metal rod",
              soldBy: "Some Guy",
              amountWithTax: 100000,
              shippingName: "New Shipping",
              shippingAddress: "10007 Mountain Drive",
              orderNumber: "456789",
            },
          ],
        },
        totalCount: 1,
      },
    }),
    getTechLevels: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            product: "Metal rod",
            soldBy: "Some Guy",
            amountWithTax: 100000,
            shippingName: "New Shipping",
            shippingAddress: "10007 Mountain Drive",
            orderNumber: "456789",
          },
        ],
        totalCount: 1,
      },
    }),
    getmarketlevels: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            product: "Metal rod",
            soldBy: "Some Guy",
            amountWithTax: 100000,
            shippingName: "New Shipping",
            shippingAddress: "10007 Mountain Drive",
            orderNumber: "456789",
          },
        ],
        totalCount: 1,
      },
    }),
    getSupplierProduct: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            product: "Metal rod",
            soldBy: "Some Guy",
            amountWithTax: 100000,
            shippingName: "New Shipping",
            shippingAddress: "10007 Mountain Drive",
            orderNumber: "456789",
          },
        ],
        totalCount: 1,
      },
    }),
  };
});

describe("EditProduct index", () => {
  const sortPrice = vi.fn;
  it("Should render without error", () => {
    const component = render(EditProduct, {
      global: {
        stubs: {
          ProductInfo: true,
          ProductProperties: true,
          ProductDocuments: true,
          AdditionalInformation: true,
          Preview: true,
        },
        provide: {
          company: ref(null),
          product: ref({
            id: "",
            ProductId: "",
            name: "",
            pickUpLocationId: "",
            manufacturer: "",
            markets: [],
            marketApplications: [],
            marketSubapplications: [],
            technologies: [],
            techApplications: [],
            techSubApplications: [],
            description: "",
            gallery: [],
            price: 0,
            unit: "",
            sampleAvailable: false,
            packagesAvailable: [],
            packages: [],
            hideProduct: false,
            hidePrice: false,
            productBrandName: "",
            supplierId: null,
            propertyItems:{
              features: {
                propertyItems: [],
                subSection: [],
              },
              applications: {
                propertyItems: [{ property: null, propertyValue: [] }],
                subSection: [],
              },
              property: {
                propertyItems: [{ property: null, propertyValue: [] }],
                subSection: [],
              },
              compliance: {
                propertyItems: [],
                subSection: [],
              },
              technical: {
                propertyItems: [{ property: null, propertyValue: [] }],
                subSection: [],
              },
            }
          }),
        },
      },
    });
    expect(screen).toMatchSnapshot();
  });
});
