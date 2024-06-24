// @ts-nocheck 
import { render, screen, fireEvent } from '@testing-library/vue'
import {it, expect, describe} from "vitest";
import AccountType from "../components/onboarding/AccountType.vue";
import {mount} from "@vue/test-utils"
import AccordionComponent from "~/components/accordion/AccordionComponent.vue";
import VendorSignUp from '~/components/Auth/VendorSignUp.vue';

describe("VendorSignup", () => {
	it("renders", () => {
		const {getByPlaceholderText} = render(VendorSignUp);
		const someInputs = screen.getAllByPlaceholderText("")
		fireEvent.update(someInputs[0], {target: {value: "Bruce"}})
		fireEvent.update(someInputs[1], {target: {value: "Wayne"}})
		fireEvent.update(someInputs[2], {target: {value: "12345678910"}})
		fireEvent.update(someInputs[3], {target: {value: "Wayne Enterprises"}})
		fireEvent.update(someInputs[4], {target: {value: "PassWord"}})
		fireEvent.update(someInputs[5], {target: {value: "PassWord"}})
		fireEvent.update(screen.getByPlaceholderText("Email address"), {target: {value: "bruce@wayne.com"}})
		fireEvent.click(screen.getByRole("checkbox"))
		fireEvent.click(screen.getByTestId("btn"))
	})
})