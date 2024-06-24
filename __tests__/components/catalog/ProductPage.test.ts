import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from '@testing-library/vue'
import ProductPage from "~/components/catalog/ProductPage.vue";
import * as vueRouter from "vue-router";
import { RouterLinkStub } from "@vue/test-utils";

const store = useProductStore();

describe("ProductPage", () => {
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
  it("Mounts without error", () => {
    const component = render(ProductPage, {
      global: {
        provide: {
          products: [
            {
              id: 1,
              title: "Item One",
              packType: 1,
              price: 2000,
              isAvailable: true,
              hidePrice: true,
            },
            {
              id: 2,
              title: "Item Two",
            },
            // {
            //   id: 3,
            //   title: "item Three",
            // },
          ],
          next:vi.fn(),
          prev:vi.fn(),
          isPageLoading: false,
          totalData: {
            totalData: {},
            pageNumber: 2,
            pageCount: 5,
          },
        },
				stubs: {
					RouterLink: RouterLinkStub
				}
      },
    });
    expect(component.html()).toContain("Item One");
    expect(component.html()).toContain("Item Two");
  });
	it("Mounts empty list", () => {
    const component = render(ProductPage, {
      global: {
        provide: {
          products: [],
          isPageLoading: false,
          next:vi.fn(),
          prev:vi.fn(),
          totalData: {
            totalData: {},
            pageNumber: 2,
            pageCount: 5,
          },
        },
      },
    });
    expect(component.html()).toContain("No data available");
		component.unmount();
  });
});
