import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Information from '~/components/onboarding/company/Information.vue';
import Documents from '~/components/onboarding/company/Documents.vue';

const mockRoutePush = vi.fn();

describe("Documents", () => {
  it("Renders without error", () => {
    const component = render(Documents, {
			global: {
				provide: {
					active: 3,
					companyInfo: ref({
						Documents: [],
						approvalStatus: true,
						companyDocuments: [],
						country: "Nigeria"
					})
				}
			}
		});
		expect(screen).toMatchSnapshot();
		component.unmount()
  });
});