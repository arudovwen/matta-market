import { createTestingPinia } from "@pinia/testing";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import Content from "~/components/OrderRequest/Content.vue";

describe("Market Content", () => {
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
        },
      },
    }),
  }));

  it("Should render without error", async () => {
    const component = render(Content, {
      props: {},
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              orderRequestStore: {
                orderRequestItems: [
                  {
                    productImg: "http://example.com/image.jpg",
                    product: "Sample Product",
                    producer: "Sample Producer",
                    selectedPackage: "Sample Package",
                    packagePrice: 100,
                    quantity: 1,
                    id: 1,
                  },
                  {
                    productImg: "http://example.com/image.jpg",
                    product: "Sample Product2",
                    producer: "Sampler",
                    selectedPackage: "Sample Package",
                    packagePrice: 1000,
                    quantity: 1,
                    id: 1,
                  },
                ],
              },
            },
          }),
        ],
        provide: {
          query: {
            Search: "",
          },
        },
      },
    });
    expect(screen).toMatchSnapshot();
  });
});
