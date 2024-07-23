import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import NotificationComponent from "~/components/Supplier/NotificationComponent.vue";

describe("NotificationComponent", () => {
  it("renders", async () => {
    const component = render(NotificationComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
									email: "bruce@gmail.com"
                },
              },
            },
          }),
        ],
        mocks: {},
      },
    });
		expect(screen).toMatchSnapshot();
		component.unmount();
  });
});
