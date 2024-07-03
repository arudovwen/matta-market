import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import MyOrders from "~/components/Supplier/MyOrders.vue";
import type { procurementorderdetails } from "~/services/orderservice";
import Customization from "~/components/Supplier/Customization.vue";
import userEvent from "@testing-library/user-event";
import { getVendorInfo } from "~/services/userservices";

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

vi.mock("~/services/userservices", async () => {
  return {
    getVendorInfo: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            storeName: "",
            storeSlug: "",
            bannerUrl: "",
            campaignBanner: "",
          },
        ],
        totalCount: 1,
      },
    }),
    updateVendorInfo: vi.fn().mockResolvedValue({ status: 200 }),
    postStoreName: vi.fn().mockResolvedValue({ status: 200 }),
  };
});

describe("MyOrders", () => {
  it("renders", async () => {
    const component = render(Customization, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    await userEvent.type(screen.getAllByPlaceholderText("")[0], "NewVal");
    await userEvent.click(screen.getByText("Save"));

    component.unmount();
  });
});
