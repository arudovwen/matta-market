import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import CatalogsComponent from "~/components/catalog/CatalogsComponent.vue";
import * as prodServices from "~/services/productservices";
import {mount, RouterLinkStub} from "@vue/test-utils"

describe("CatalogsComponent", () => {
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
    const component = render(CatalogsComponent, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				}
			}
		});
    expect(prodServices.getMarkets).toBeCalled();
    expect(screen.getByTestId("spinner")).toBeDefined();
    await waitForElementToBeRemoved(screen.getByTestId("spinner"))
		expect(screen.getByText("Market One")).toBeDefined();
  });
});
