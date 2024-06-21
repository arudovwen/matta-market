import {mountSuspended} from "@nuxt/test-utils/runtime"
import {it, expect, describe} from "vitest";
import AccountType from "../components/onboarding/AccountType.vue";
import {mount} from "@vue/test-utils"
import { not } from "@vuelidate/validators";

describe("AccountType", () => {
	it("renders", () => {
		const component = mount(AccountType);
		expect(component.html()).toContain("Create account on behalf of the company.");
		expect(component.find("a")).not.toBeNull()
	})
})