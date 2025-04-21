import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import AppHeader from "~/components/AppHeader.vue";
import SimilarProducts from "~/components/Information/SimilarProducts.vue";
import { createWebHistory } from "vue-router";
import * as vueRouter from "vue-router";
import type { getProducts } from "~/services/productservices";

const store = createStore({
  state: {
    loggedUser: {
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    },
  },
  getters: {
    loggedUser: () => ({
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    }),
  },
});

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
vi.spyOn(vueRouter, "useRoute").mockImplementation(() => ({
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
}));

vi.mock("~/services/productservices", () => ({
  getProducts: vi.fn().mockResolvedValue({
    data: {
      succeeded: true,
      message: null,
      errors: null,
      data: {
        pageNumber: 1,
        pageSize: 8,
        totalCount: 6,
        succeeded: true,
        message: null,
        errors: null,
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
              "https://proxy.matta.trade/uploads/9e905f49-50d4-40ae-9b40-fa797d255756.jpg",
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
              "https://proxy.matta.trade/uploads/47d3e928-4ffc-4b6d-bd6b-88ff0ee95c35.jpg",
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
          {
            id: "3379915000005149001",
            title: "Reacher 2.2",
            seller: null,
            price: 1000,
            optionCount: 2,
            packString: [
              {
                package: {
                  id: "c2ff60e4-dbf2-46ae-b466-76d488f55f99",
                  title: "Plastic drum",
                },
                unit: "kg",
                size: 5,
                color: "Blue",
                purity: "99",
                amount: 1000,
                purchaseAmount: 0,
                isAvailable: false,
              },
              {
                package: {
                  id: "90e9e3ab-37ab-48cd-80c5-77c7827743fd",
                  title: "Metal drum",
                },
                unit: "kg",
                size: 5,
                color: "white",
                purity: "99",
                amount: 1500,
                purchaseAmount: 0,
                isAvailable: true,
              },
            ],
            pack: {
              id: "c2ff60e4-dbf2-46ae-b466-76d488f55f99",
              title: "Plastic drum",
            },
            packType: "Plastic drum",
            logo: null,
            converPhoto:
              "https://proxy.matta.trade/uploads/b9c6f47b-66ed-461e-92f8-23ff99b49001.jpg",
            isAvailable: true,
            customerId: "3379915000002081001",
            manufacturer: "BASF",
            unit: "kg",
            liked: false,
            hidePrice: false,
            created: null,
            sku: "rea/p&p/tes/f9e/vm3/eng/5kg",
            pickUpLocationId: null,
          },
          {
            id: "3379915000003911001",
            title: "Genple",
            seller: null,
            price: 5000,
            optionCount: 1,
            packString: [
              {
                package: {
                  id: "05d9f7a1-08b1-4c91-acbc-62eaf30d5c4d",
                  title: "Carton",
                },
                unit: "bag(s)",
                size: 4,
                color: null,
                purity: null,
                amount: 5000,
                purchaseAmount: 0,
                isAvailable: true,
              },
            ],
            pack: {
              id: "05d9f7a1-08b1-4c91-acbc-62eaf30d5c4d",
              title: "Carton",
            },
            packType: "Carton",
            logo: null,
            converPhoto:
              "https://proxy.matta.trade/uploads/ffd3d069-aa44-4b7c-84d0-06d26b953e40.jpg",
            isAvailable: true,
            customerId: "3379915000002081001",
            manufacturer: "Phamazell",
            unit: "bag(s)",
            liked: false,
            hidePrice: false,
            created: null,
            sku: "gen/e&e/sem/ooo/xxx/eng/4",
            pickUpLocationId: null,
          },
          {
            id: "3379915000003727001",
            title: "Defoamers",
            seller: null,
            price: 3000,
            optionCount: 2,
            packString: [
              {
                package: {
                  id: "8fd29d42-9161-4a01-a78e-a49d12926e72",
                  title: "Cylinder",
                },
                unit: "kg",
                size: 20,
                color: "White",
                purity: null,
                amount: 3000,
                purchaseAmount: 0,
                isAvailable: true,
              },
              {
                package: {
                  id: "41e8aad7-9709-48dc-bce0-0956bfe7b3fd",
                  title: "Tank",
                },
                unit: "g",
                size: 3000,
                color: "",
                purity: "",
                amount: 100,
                purchaseAmount: 0,
                isAvailable: true,
              },
            ],
            pack: {
              id: "8fd29d42-9161-4a01-a78e-a49d12926e72",
              title: "Cylinder",
            },
            packType: "Cylinder",
            logo: null,
            converPhoto:
              "https://proxy.matta.trade/uploads/ec112a4c-a73d-4316-b79c-e5b581da247d.jpg",
            isAvailable: true,
            customerId: "3379915000003722002",
            manufacturer: "Defoamers Inc",
            unit: "kg",
            liked: false,
            hidePrice: false,
            created: null,
            sku: "def/i/oil/ooo/xxx/fra/20kg",
            pickUpLocationId: null,
          },
          {
            id: "3379915000004732001",
            title: "Testing New Product",
            seller: null,
            price: 2221,
            optionCount: 1,
            packString: [
              {
                package: {
                  id: "fb464c94-1d6a-4dca-a88d-810bb9f37f3b",
                  title: "Carton",
                },
                unit: "g",
                size: 12,
                color: null,
                purity: null,
                amount: 2221,
                purchaseAmount: 0,
                isAvailable: true,
              },
            ],
            pack: {
              id: "fb464c94-1d6a-4dca-a88d-810bb9f37f3b",
              title: "Carton",
            },
            packType: "Carton",
            logo: null,
            converPhoto:
              "https://proxy.matta.trade/uploads/61081b95-0837-4f33-9d68-a35c84c3ae36.jpg",
            isAvailable: true,
            customerId: "3379915000002081001",
            manufacturer: "BASF",
            unit: "g",
            liked: false,
            hidePrice: false,
            created: null,
            sku: "tes/p&p/spe/2og/x08/eng/12",
            pickUpLocationId: null,
          },
        ],
      },
    },
  }),
}));

describe("SimilarProducts", () => {
  it("renders", async () => {
    const product = {
      value: {
        name: "Test Product",
        liked: false,
        hidePrice: false,
        gallery: [],
        packagesAvailable: [],
        packages: [],
        marketApplications: [],
				marketSubapplications: []
      },
    };
    const defaultPackage = { amount: 100, unit: "Kg" };
    const supplier = { logo: "", companyName: "" };

    const store = createStore({
      getters: {
        isLoggedIn: () => true,
        userId: () => 1,
      },
    });

    const component = render(SimilarProducts, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          product: product,
          defaultPackage,
          supplier,
        },
      },
    });
    
    component.unmount();
  });
});
