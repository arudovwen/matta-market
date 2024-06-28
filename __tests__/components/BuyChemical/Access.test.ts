import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Access from "~/components/BuyChemical/Access.vue"
import Traditional from "~/components/BuyChemical/Traditional.vue"

describe('Access', () => {
	it("Should render without error", () => {
		const component = render(Access);
		expect(screen).toMatchSnapshot();
	})
})