import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
<<<<<<<< HEAD:__tests__/components/Supplier/CompanySettings.test.ts
import CompanySettings from "~/components/Supplier/CompanySettings.vue";
import settings from "~/pages/company/settings.vue";

========
import CompanySettingsCopy from "~/components/Supplier/CompanySettings copy.vue";
import { getCompanyProfile, updateCompanyProfile } from "~/services/settingservices";
>>>>>>>> new-unit-tests:__tests__/components/Supplier/CompanySettings copy.test.ts

const store = createStore({
  state: {
    loggedUser: {
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    },
  },
  getters: {
    loggedUser: () => ({
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    }),
  },
});

<<<<<<<< HEAD:__tests__/components/Supplier/CompanySettings.test.ts
describe("CompanySettings", () => {
========
const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

vi.mock("~/services/settingservices", () => ({
  getCompanyProfile: vi.fn().mockResolvedValueOnce({
    data: {
      data: {
        photo: "photo_url",
        companyName: "Test Company",
        companyType: "IT",
        website: "https://test.com",
        fax: "123456",
        description: "Test Description",
        socials: [{ name: "facebook", link: "https://facebook.com/test" }],
        address: "Test Address",
        country: "Nigeria",
        city: "Test City",
        email: "test@test.com",
        phone: "1234567890",
        logo: "logo_url",
        state: "Test State",
      },
    },
  }),
	updateCompanyProfile: vi.fn().mockResolvedValue({
		status: 200
	})
}));

describe("CompanySettings copy", () => {
>>>>>>>> new-unit-tests:__tests__/components/Supplier/CompanySettings copy.test.ts
  it("renders", async () => {
    const component = render(settings, {
      global: {
        plugins: [store],
      },
    });
<<<<<<<< HEAD:__tests__/components/Supplier/CompanySettings.test.ts
========
    expect(screen.getByText("Company settings")).toBeTruthy();
		// await fireEvent.click(screen.getByTestId("save-img"))
		await fireEvent.change(screen.getByTestId("upload"), {target: {files: [file]}})
		await fireEvent.click(screen.getByTestId("save-img"))
		await fireEvent.click(screen.getByTestId("submit-form"))

    component.unmount();
>>>>>>>> new-unit-tests:__tests__/components/Supplier/CompanySettings copy.test.ts
  });
});
