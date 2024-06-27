import { describe, it } from "vitest";
import RegisterModal from "../components/RegisterModal.vue";
import { render, screen } from "@testing-library/vue";
import { createStore } from "vuex";

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
		isLoggedIn: () => true
  },
});

describe("RegisterModal", () => {
	it("runs", () => {
		render(RegisterModal, {
			global: {
				plugins: [store]
			},
			props: {
				isOpen: true
			}
		})
		screen.debug()
	})
})