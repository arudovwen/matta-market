import { createTestingPinia } from "@pinia/testing";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import Side from "~/components/OrderRequest/Side.vue";

describe("Market Side", () => {

  it("Should render without error", async () => {
    const component = render(Side, {
      props: {},
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              orderRequest: {
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
