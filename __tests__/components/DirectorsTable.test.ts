import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import DirectorsTable from "~/components/DirectorsTable.vue";
import AppMobileMenu from "~/components/AppMobileMenu.vue";
import EmailVerification from "~/components/EmailVerification.vue";
import * as authServices from "~/services/authservices";
import confirmEmail from "~/pages/confirm-email.vue";
import AddedToCart from "~/components/AddedToCart.vue";
import UploadComponent from "~/components/UploadComponent.vue";

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

describe("DirectorsTable", () => {
  it("renders", async () => {
 
    const component = render(DirectorsTable, {
      global: {
        plugins: [store],
      },
      props: {
        directors: [
          {
            firstName: "Bruce",
            lastName: "Wayne",
            phone: "1234567891011",
            bvn: "45678987654",
            identityUrl: "tst.url",
            signatureUrl: "tst.url",
            linkedIn: "tst.url",
            dob: "6/22/2024",
          },
          {
            firstName: "Tony",
            lastName: "Stark",
            phone: "1234567891011",
            bvn: "45678987654",
            identityUrl: "tst.url",
            signatureUrl: "tst.url",
            linkedIn: "tst.url",
            dob: "6/22/2024",
          },
        ],
      },
    });

    expect(component.html()).toContain("Bruce");
    expect(component.html()).toContain("Tony");
		component.unmount()
  });
});

describe("AppMobileMenu", () => {
  it("renders", () => {
    const component = render(AppMobileMenu, {
      props: {
        title: "random",
      },
      global: {
        provide: {
          open: true,
        },
      },
    });
    expect(screen).toMatchSnapshot();
		component.unmount()
  });
});

describe("EmailVerification", () => {
  vi.spyOn(authServices, "confirmemail").mockResolvedValue({ status: 200 });
  it("renders", async () => {
    const component = render(EmailVerification, {
      global: {
        provide: {
          open: true,
        },
      },
    });
    await waitForElementToBeRemoved(screen.getByText("Verifying email.."));
    expect(screen.getByText("Email verified")).toBeTruthy();
		component.unmount()
  });
});

describe("AddedToCart", () => {
  it("renders", async () => {
    render(AddedToCart, {
      global: {
        provide: {
          open: true,
        },
      },
			props: {
				name: "ItemOne",
				selectedPackage: "package One",
				totalAmount: 60,
				quantity: 25,
				hidePrice: true
			}
    });
    expect(screen.getByText("ItemOne")).toBeTruthy();
  });
});

describe("UploadComponent", () => {
  it("renders", async () => {
    const component = render(UploadComponent, {
      global: {
        provide: {
          open: true,
        },
      },
			props: {
				isMultiple: false,

			}
    });
    expect(component.html()).toContain("Click to upload")
		await fireEvent.drop(screen.getByTestId("upload"), { dataTransfer: { files: [new File(['hello'], 'hello.png', { type: 'image/png' })] } });
  });
  it("renders multi", async () => {
    const component = render(UploadComponent, {
      global: {
        provide: {
          open: true,
        },
      },
			props: {
				isMultiple: true,
			}
    });
		
    expect(component.html()).toContain("Click to upload")
		await fireEvent.drop(screen.getByTestId("upload"), { dataTransfer: { files: [new File(['hello'], 'hello.png', { type: 'image/png' })] } });
		component.unmount()
  });
});
