import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import PersonalAccount from '~/components/onboarding/PersonalAccount.vue';

const mockRoutePush = vi.fn();

describe("PersonalAccount", () => {

  it("Renders without error", () => {
    const component = render(PersonalAccount, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				}
			}
    });
		component.unmount()
  });
});