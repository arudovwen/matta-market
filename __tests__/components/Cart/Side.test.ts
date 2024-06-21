import { it, expect, describe, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Side from "~/components/Cart/Side.vue";

const store = useProductStore();

describe("Content", () => {
	const component = mount(Side);
  it("Mounts without error", () => {
		expect(component.html()).toContain("Order Summary")
  });
});
