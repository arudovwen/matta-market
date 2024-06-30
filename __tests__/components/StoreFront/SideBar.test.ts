import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import * as prodServices from "~/services/productservices";
import { mount, RouterLinkStub } from "@vue/test-utils";
import SideBar from "~/components/Storefront/SideBar.vue";

vi.mock("~/stores/supplier", () => ({
	useSupplierStore: () => ({
	  fetchProducers: vi.fn(),
	  producersData: [{ title: "Producer1" }, { title: "Producer2" }],
	}),
  }));
  vi.mock("~/stores/market", () => ({
	useMarketStore: () => ({
	  getMarketMenu: vi.fn(),
	  marketMenuData: [{ id: "1", value: "Market1" }, { id: "2", value: "Market2" }],
	}),
  }));
   // Mocking the router
   vi.mock("vue-router", () => ({
    useRoute: vi.fn().mockReturnValue({
      params: { id: "1", category: "market" },
    }),
    }));
    
it("Mounts without error", async () => {
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
  const component = render(SideBar, {
		global: {
			provide: {
				query: {
					sortOrder: 1,
				}
			}
		}
	});
  
  expect(screen).toMatchSnapshot();
  component.unmount();
});
