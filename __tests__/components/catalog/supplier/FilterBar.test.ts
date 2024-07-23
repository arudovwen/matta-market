import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import FilterBar from "~/components/catalog/supplier/FilterBar.vue";
import * as prodServices from "~/services/productservices";
import {mount, RouterLinkStub} from "@vue/test-utils"

describe("FilterBar", () => {
  vi.mock("../../../services/productservices", () => ({
    getMarkets: vi.fn().mockResolvedValue({
      data: {
        data: [
          {
            imagePath: "~/assets/testn",
            marketColor: "rgb(88 88 88)",
            title: "Market One",
            productCount: 23,
            categoriesCount: 3,
          },
        ],
        isLoading: false,
        totalData: {},
      },
    }),
  }));
  it("Mounts without error", async () => {
    const component = render(FilterBar, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				},
				provide: {
					allmarkets: {
						value: []
					},
					manufacturers: {
						value: [
							{
								id: 0,
								title: "Skynet",
							},
							{
								id: 0,
								title: "Apple",
							},
							{
								id: 0,
								title: "Tesla",
							},
						],
					},
				}
			}
		});
		
		expect(screen).toMatchSnapshot();
		component.unmount();
  });
});
