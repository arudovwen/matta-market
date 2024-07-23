import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Start from "~/components/BuyChemical/Start.vue"

describe('Start', () => {
	it("Should render without error", () => {
		const component = render(Start);
		expect(screen).toMatchSnapshot();
	})
})