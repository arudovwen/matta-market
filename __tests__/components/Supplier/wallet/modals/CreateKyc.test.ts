import { render, screen, fireEvent } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import { mount, shallowMount } from "@vue/test-utils";

import CreateKyc from "../../../../../components/Supplier/wallet/modals/CreateKyc.vue";

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

describe("CreateKyc", () => {
  vi.mock("../../../../../services/productservices", () => ({
    getKycDetail: vi.fn().mockResolvedValue({
      data: {
        data: {
          fullName: "Bruce Wayne",
          phoneCode: "+234",
          phone: "567891011",
          bvn: "686768398",
          cac: "I dunno",
          nin: "6272937382",
          utilityBilly: "",
          address: "1007 Mountain Drive",
          companyType: 2,
          companyName: "Wayne Enterprises",
          directorsInfos: {},
        },
      },
    }),
  }));
  it("renders", async () => {
    const component = render(CreateKyc, {
      global: {
        plugins: [store],
      },
    });
		fireEvent.input(screen.getByTestId("fullName"), {target: {value: "Bruce Wayne"}})
		fireEvent.input(screen.getByTestId("address"), {target: {value: "1007 Mountain Drive"}})
		fireEvent.input(screen.getByTestId("director-title"), {target: {value: "1007 Mountain Drive"}})
		
		// @ts-ignore
		expect(screen.getByTestId("fullName").value).toBe("Bruce Wayne")
		// @ts-ignore
		expect(screen.getByTestId("address").value).toBe("1007 Mountain Drive")

		fireEvent.click(screen.getByTestId("add-director"))
		.then(() => {
		})
		// screen.debug();
  });
});
