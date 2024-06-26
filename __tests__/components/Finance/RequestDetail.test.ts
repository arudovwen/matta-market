import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import RequestDetail from "~/components/Finance/RequestDetail.vue";
import { getFinance } from "~/services/financeservice";

describe("RequestDetail", () => {
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

  it("Should render without error", async () => {
    const component = render(RequestDetail, {
      props: {
        detail: {
          tenor: 3,
          amountRequired: 30000,
          amountApproved: 200000,
          interestRate: 3,
        },
      },
    });
    expect(screen).toMatchSnapshot();
  });

});
