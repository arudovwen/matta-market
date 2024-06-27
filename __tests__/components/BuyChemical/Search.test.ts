import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Search from "~/components/BuyChemical/Search.vue"

describe('Search', () => {
	it("Should render without error", () => {
		const component = render(Search);
		expect(screen).toMatchSnapshot();
	})
})