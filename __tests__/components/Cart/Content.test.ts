import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from "@pinia/testing";
import Content from "~/components/Cart/Content.vue";

const store = useProductStore();

describe("Content", () => {
	const component = render(Content);
  it("Mounts without error", () => {
		expect(component.html()).toContain("You have no item in your cart")
  });
});
