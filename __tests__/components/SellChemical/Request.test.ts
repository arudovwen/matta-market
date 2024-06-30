import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import Request from "~/components/SellChemical/Request.vue";

describe("Request", () => {
	it("Mounts without error", async () => {
		const component = render(Request);
		
		expect(screen).toMatchSnapshot();
		component.unmount();
	});

})

