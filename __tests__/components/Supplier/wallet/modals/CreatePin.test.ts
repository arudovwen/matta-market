import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { flushPromises, mount, shallowMount } from "@vue/test-utils";

import CreatePin from "../../../../../components/Supplier/wallet/modals/CreatePin.vue";
import { setWalletpin } from "~/services/walletservice";

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

describe("CreatePin", () => {
  vi.mock("~/services/walletservice", () => ({
    setWalletpin: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          message: "Success",
        },
      },
    }),
  }));
  it("renders", async () => {
    const component = render(CreatePin, {
      global: {
        plugins: [store],
      },
      props: {
        details: {
          walletId: "45678987",
        },
      },
    });
    await fireEvent.update(
      screen.getByPlaceholderText("Enter new pin"),
      "1234"
    );
    await fireEvent.update(
      screen.getByPlaceholderText("Confirm your pin"),
      "1244"
    );
    expect(screen.getByText("Pins must match")).toBeTruthy();
    await fireEvent.update(
      screen.getByPlaceholderText("Confirm your pin"),
      "1234"
    );
    expect(screen.queryByText("Pins must match")).toBeNull();
    await fireEvent.click(screen.getByText("Submit"));
    component.unmount();
    // ;
  });
});
