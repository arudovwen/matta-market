import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Information from '~/components/onboarding/company/Information.vue';

const mockRoutePush = vi.fn();

describe("Information", () => {
  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: mockRoutePush,
        };
      },
      useRoute: vi.fn(),
    };
  });
  vi.spyOn(vueRouter, "useRoute").mockImplementation(() => ({
    fullPath: "",
    hash: "",
    matched: [],
    name: "",
    meta: {},
    params: {},
    path: "",
    query: {
      // @ts-ignore
      onboarding_stage: 1,
    },
    redirectedFrom: undefined,
  }));
  it("Renders without error", () => {
    const component = render(Information, {
			global: {
				provide: {
					active: 1
				}
			}
		});
		expect(screen).toMatchSnapshot()
		component.unmount();
  });
});