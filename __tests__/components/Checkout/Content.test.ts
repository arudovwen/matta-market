import { render, screen } from "@testing-library/vue";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Information from "~/components/onboarding/company/Information.vue";
import Content from "~/components/Checkout/Content.vue";
import * as cartService from "~/services/cartservice";
import { createTestingPinia } from "@pinia/testing";

const mockRoutePush = vi.fn();

describe("Content", () => {
  it("Renders without error", () => {
    // @ts-ignore
    vi.spyOn(cartService, "shippingBreakdown").mockResolvedValue({
      status: 200,
      data: {
        data: {
          items: [],
        },
        totalShippingCost: 3000,
      },
    });
    const component = render(Content, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
              },
							shipping: {
								addresses: [
									{}
								]
							}
            },
          }),
        ],
        provide: {
          active: 2,
          companyInfo: ref({
            directors: [],
            approvalStatus: true,
          }),
        },
      },
    });
    expect(screen).toMatchSnapshot();
		component.unmount();
  });
});
