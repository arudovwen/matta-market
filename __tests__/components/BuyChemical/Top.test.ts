import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Top from "~/components/BuyChemical/Top.vue"

describe('Top', () => {
	it("Should render without error", () => {
		const component = render(Top);
		expect(screen).toMatchSnapshot();
	})
})