import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Information from '~/components/onboarding/company/Information.vue';
import Directors from '~/components/onboarding/company/Directors.vue';

const mockRoutePush = vi.fn();

describe("Directors", () => {
  it("Renders without error", () => {
    const component = render(Directors, {
			global: {
				provide: {
					active: 2,
					companyInfo: ref({
						directors: [],
						approvalStatus: true
					})
				}
			}
		});
		expect(screen).toMatchSnapshot();
  });
});