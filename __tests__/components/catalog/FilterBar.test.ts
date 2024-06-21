import { it, expect, describe, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import FilterBar from "~/components/catalog/FilterBar.vue";

const store = useProductStore();

describe("Content", () => {
  const sortPrice = vi.fn;
  const component = mount(FilterBar, {
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
