import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import MainContent from "~/components/favourites/MainContent.vue";

describe("MainContent",  () => {
  it("Should render without error", async () => {
    const component = render(MainContent, {
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
          suppliers: [
            {
              supplierId: "987656789",
              supplier: "CC Penni",
            },
            {
              supplierId: "9876789",
              supplier: "Fireboy's Dealer",
            },
          ],
          productParams: {
            Manufacturer: "Test",
            SortOrder: "a",
            Search: "Test",
          },
          supplierParams: {
            Manufacturer: "Test",
            SortOrder: "a",
            Search: "Test",
          },
        },
      },
    });
		await fireEvent.click(screen.getByText("favourites products"))
		await fireEvent.click(screen.getByText("favourites suppliers"))
		screen.debug()
  });
});
