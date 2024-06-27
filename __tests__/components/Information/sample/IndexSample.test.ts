import { render, screen, fireEvent } from '@testing-library/vue'
import {it, expect, describe} from "vitest";
import IndexSample from '~/components/Information/sample/IndexSample.vue';

describe("IndexSample", () => {
	it("renders", () => {
		const {getByPlaceholderText} = render(IndexSample, {
			global: {
				provide: {
					product: ref({
						supplierId: "56789098",
						id: "6545678",
						gallery: [""],
						name: "Bruce Wayne",
						producer: {
							id: "56786",
							title: "Builder"
						}
					})
				}
			}
		});
		expect(screen).toMatchSnapshot();
	})
})