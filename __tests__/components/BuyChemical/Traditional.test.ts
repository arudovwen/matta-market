import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Traditional from "~/components/BuyChemical/Traditional.vue"

describe('Traditional', () => {
	it("Should render without error", () => {
		const component = render(Traditional);
		expect(screen).toMatchSnapshot();
	})
})