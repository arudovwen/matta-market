import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Love from "~/components/BuyChemical/Love.vue"

describe('Love', () => {
	it("Should render without error", () => {
		const component = render(Love);
		expect(screen).toMatchSnapshot();
	})
})