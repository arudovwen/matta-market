import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import OrderComponent from "~/components/Supplier/OrderComponent.vue";

describe("OrderComponent", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({});

  vi.mock("~/services/settingservices", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getesfrontstats: vi.fn().mockResolvedValue({
        data: {
          data: { data: {} },
        },
      }),
      getstorefronttrending: vi.fn().mockResolvedValue({
        data: {
          data: [],
        },
      }),
    };
  });

  vi.mock("~/services/chartservice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getorderchart: vi.fn().mockResolvedValue({
        status: 200,
        data: {
          data: {
            data: [
              {
                chartrecords: [],
              },
              {
                chartrecords: [],
              },
            ],
          },
        },
      }),
      getchart: vi.fn().mockResolvedValue({
        data: {
          data: {},
        },
      }),
    };
  });
  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: vi.fn,
        };
      },
      useRoute: vi.fn().mockImplementation(() => ({
        fullPath: "",
        hash: "",
        matched: [],
        name: "",
        meta: {},
        params: {},
        path: "",
        query: {
          // @ts-ignore
          onboarding_stage: 2,
        },
        redirectedFrom: undefined,
      })),
    };
  });

  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  it("renders", async () => {
    const component = render(OrderComponent, {
      props: {
        order: {
          orderDate: "12/01/24",
          orderTotalWithTax: 300000,
          orderTotal: 10000,
          shippingTotal: 20000,
          discountValue: 20000,
          orderDetails: [
            {
              product: "One Thing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 6,
            },
            {
              product: "Another Thing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 0,
            },
            {
              product: "The Thing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 1,
            },
            {
              product: "SomeThing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 2,
            },
            {
              product: "NoThing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 3,
            },
            {
              product: "AnyThing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 4,
            },
            {
              product: "ThatThing",
              quantity: 20,
              itemTotal_with_tax: 20000,
              orderItemStatus: 5,
            },
          ],
        },
      },
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
                },
              },
            },
          }),
        ],
        mocks: {},
      },
    });
    expect(screen.getByText("Shipping in progress"));
    expect(screen.getByText("NoThing"));
		expect(screen).toMatchSnapshot();
		component.unmount();
  });
});
