import { it, expect, describe, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Content from "~/components/Cart/Content.vue";

const store = useProductStore();

describe("Content", () => {
	const component = mount(Content);
  it("Mounts without error", () => {
		expect(component.html()).toContain("You have no item in your cart")
  });
});
