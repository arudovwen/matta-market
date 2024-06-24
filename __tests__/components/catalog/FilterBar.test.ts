import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from '@testing-library/vue'
import FilterBar from "~/components/catalog/FilterBar.vue";

const store = useProductStore();

describe("Content", () => {
  const sortPrice = vi.fn;
  const component = render(FilterBar, {
    global: {
      provide: {
        sortPrice: sortPrice,
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
        queryParams:{
          MarketId: "",
          Search: "",
          PageSize: 10,
          PageNumber: 1,
          ShowSubMenu: true,
          Producer: "",
          pagecount: 0,
          totalCount: 0,
          Status: "",
        },
				allmarkets: {
					value: [
					]
				}
      },
    },
  });
  it("Mounts without error", () => {
    expect(component.html()).toContain("Skynet");
    expect(component.html()).toContain("Tesla");
  });
});
