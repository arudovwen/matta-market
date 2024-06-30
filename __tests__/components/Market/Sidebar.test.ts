import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import RequestDetail from "~/components/Finance/RequestDetail.vue";
import SideBar from "~/components/Market/SideBar.vue";
import { getFinance } from "~/services/financeservice";

describe("Market SideBar", () => {
  vi.mock("~/services/financeservice", () => ({
    updateFinanceStatus: vi.fn().mockResolvedValue({
      status: 200,
    }),
		getFinance: vi.fn().mockResolvedValue({
			data: {
				data: {
					financeRequestNo: "456789876",
					created: new Date("11/12/23"),
					amountRequired: 200000,
					amountApproved: 300000,
					approvedOn: new Date("11/12/23"),
					tenor: 4,
					interestRate: 4,
					loanRequestType: 4,
					haveyoudonebusiness: true,
				}
			}
		})
  }));
// Mocking the stores
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
  
  vi.mock("~/stores/application", () => ({
	useApplicationStore: () => ({
	  getAppMenu: vi.fn(),
	  applicationMenuData: [{ id: "1", value: "App1" }, { id: "2", value: "App2" }],
	}),
  }));
  
  // Mocking the router
  vi.mock("vue-router", () => ({
	useRoute: vi.fn().mockReturnValue({
	  params: { id: "1", category: "market" },
	}),
  }));
  

  it("Should render without error", async () => {
    const component = render(SideBar, {
      props: {
      },
			global: {
				provide: {
					query: {
						Search: ""
					}
				}
			}
    });
    expect(screen).toMatchSnapshot();
  });

});
