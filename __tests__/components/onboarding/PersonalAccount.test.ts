import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import PersonalAccount from '~/components/onboarding/PersonalAccount.vue';
import { getProfile } from "~/services/settingservices";

// Mocking settingservices/getProfile
vi.mock("~/services/settingservices", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    getProfile: vi.fn().mockResolvedValue({
      data: {
        data: {
          photo: "https://example.com/profile.jpg",
          firstName: "Bruce",
          lastName: "Wayne",
          country: "Gotham",
          city: "Gotham City",
          email: "bruce.wayne@example.com",
          phone: "+234123456789",
          timeZone: "GMT",
        },
      },
    }),
  };
});
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