import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from '@testing-library/vue'
import Side from "~/components/Cart/Side.vue";

const store = useProductStore();

describe("Content", () => {
	const component = render(Side);
  it("Mounts without error", () => {
		expect(component.html()).toContain("Order Summary")
  });
});
