import { render, screen } from '@testing-library/vue'
import {it, expect, describe} from "vitest";
import AccountType from "../components/onboarding/AccountType.vue";
import {mount} from "@vue/test-utils"
import { not } from "@vuelidate/validators";

describe("AccountType", () => {
	it("renders", () => {
		const component = render(AccountType);
		expect(component.html()).toContain("Create account on behalf of the company.");
		component.unmount()
	})
})