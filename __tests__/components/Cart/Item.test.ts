import { it, expect, describe, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Item from "~/components/Cart/Item.vue";

const store = useProductStore();

describe("Item", () => {
	const component = mount(Item, {
		props: {
			detail: {
				productImg: "",
				product: "TstProd",
				producer: "Skynet",
				selectedPackage: "package one",
				packagePrice: 300,
				quantity: 4
			}
		}
	});
  it("Mounts without error", () => {
		expect(component.html()).toContain("TstProd")
		expect(component.html()).toContain("1,200")
  });
});
