import { render, screen, fireEvent } from '@testing-library/vue'
import {it, expect, describe} from "vitest";
import BuyerSignUp from '~/components/Auth/BuyerSignUp.vue';

describe("BuyerSignup", () => {
	it("renders", () => {
		const {getByPlaceholderText} = render(BuyerSignUp);
		const someInputs = screen.getAllByPlaceholderText("")
		// fireEvent.input(someInputs[0], {target: {value: "Bruce"}})
		// fireEvent.input(someInputs[1], {target: {value: "Wayne"}})
		// fireEvent.input(someInputs[2], {target: {value: "12345678910"}})
		// fireEvent.input(someInputs[3], {target: {value: "Wayne Enterprises"}})
		// fireEvent.input(someInputs[4], {target: {value: "PassWord"}})
		// fireEvent.input(someInputs[5], {target: {value: "PassWord"}})
		// fireEvent.input(screen.getByPlaceholderText("Email address"), {target: {value: "bruce@wayne.com"}})
		// fireEvent.click(screen.getByRole("checkbox"))
		// fireEvent.click(screen.getByTestId("btn"))
	})
})