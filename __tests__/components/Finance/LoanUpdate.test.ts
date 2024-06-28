import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import MainComponent from "~/components/Dashboard/layout/MainComponent.vue";
import LoanUpdate from "~/components/Finance/LoanUpdate.vue";
import MainContent from "~/components/favourites/MainContent.vue";
import { updateFinanceStatus } from "~/services/financeservice";

describe("LoanUpdate", () => {
  vi.mock("~/services/financeservice", () => ({
    updateFinanceStatus: vi.fn().mockResolvedValue({
      status: 200,
    }),
  }));

  it("Should render without error", async () => {
    const component = render(LoanUpdate, {
      props: {
        detail: {
          tenor: 3,
          amountRequired: 30000,
          amountApproved: 200000,
          interestRate: 3,
        },
      },
    });
		await fireEvent.click(screen.getAllByTestId("btn")[0]);
    expect(screen).toMatchSnapshot();
  });
  it("Should render without error", async () => {
    const component = render(LoanUpdate, {
      props: {
        detail: {
          tenor: 3,
          amountRequired: 30000,
          amountApproved: 200000,
          interestRate: 3,
        },
      },
    });
		await fireEvent.click(screen.getAllByTestId("btn")[1]);
    expect(screen).toMatchSnapshot();
  });
});
