import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import FilterBar from "~/components/favourites/FilterBar.vue";


describe('Filterbar', () => {
	it("Should render without error", () => {
		const component = render(FilterBar, {
			props: {showing: true},
			global: {
				provide: {
					productParams: {
						Manufacturer: "Test",
						SortOrder: "a",
						Search: "Test"
					}
				}
			}
		});
		expect(screen).toMatchSnapshot();
	})
})