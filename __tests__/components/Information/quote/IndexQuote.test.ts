import { render, screen, fireEvent } from '@testing-library/vue'
import {it, expect, describe} from "vitest";
import IndexQuote from '~/components/Information/quote/IndexQuote.vue';

describe("IndexQuote", () => {
	it("renders", () => {
		const {getByPlaceholderText} = render(IndexQuote, {
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