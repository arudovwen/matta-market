import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import CompanySettingsCopy from "~/components/Supplier/CompanySettings copy.vue";
import { getCompanyProfile, updateCompanyProfile } from "~/services/settingservices";

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
  it("renders", async () => {
    const component = render(CompanySettingsCopy, {
      global: {
        plugins: [store],
      },
    });
    expect(screen.getByText("Company settings")).toBeTruthy();
		// await fireEvent.click(screen.getByTestId("save-img"))
		await fireEvent.change(screen.getByTestId("upload"), {target: {files: [file]}})
		await fireEvent.click(screen.getByTestId("save-img"))
		await fireEvent.click(screen.getByTestId("submit-form"))

    component.unmount();
  });
});
