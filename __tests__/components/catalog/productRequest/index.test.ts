import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import FilterBar from "~/components/catalog/FilterBar.vue";
import AdditionalInformation from "~/components/Supplier/AddProduct/AdditionalInformation.vue";
import index from "~/components/catalog/productRequest/index.vue";
import * as vueRouter from "vue-router";
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
  },
});

const form = {
	productQuestions: [],
	tags: [],
	productExperts: [],
}

vi.mock("vue-router", () => {
	return {
		RouterView: {},
		useRouter: () => {
			return {
				push: vi.fn,
			};
		},
		useRoute: vi.fn,
	};
});

describe("AddProduct index", () => {
  it("renders", () => {
		const component = render(index, {
			global: {
				plugins: [store]
			}
		})
		expect(component.html()).toContain("I confirm that I want to submit this request")
		component.unmount();
	})
});
