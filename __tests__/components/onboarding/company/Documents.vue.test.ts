import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
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