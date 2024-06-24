import { it, expect, describe, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from '@testing-library/vue'
import FilterBar from "~/components/catalog/FilterBar.vue";
import CustomVueSelect from "~/components/Select/CustomVueSelect.vue";

const store = useProductStore();

describe("Content",  () => {
  const sortPrice = vi.fn;
  const component = render(CustomVueSelect, {
		props: {
			placeholder: "Tstn",
			isCumpulsory: true,
			options: [],
			name: "tst",
			disabled: true,
			label: "Test Input"
		}
	});
  it("Mounts without error", async () => {
		expect(component.html()).toContain("Test Input")
		expect(screen.getByTestId("red-dot")).toBeTruthy()
		expect(screen.getByTestId("input")).toBeTruthy()
		await fireEvent.input(screen.getByTestId("input").children[0].children[0].children[0], {target: {value: "wa"}})
		;	
  });
});
