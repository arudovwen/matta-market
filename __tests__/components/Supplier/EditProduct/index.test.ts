import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import EditProduct from "~/components/Supplier/EditProduct/index.vue";
import * as vueRouter from "vue-router";

const store = useProductStore();

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

vi.spyOn(vueRouter, "useRoute").mockImplementationOnce(() => reactive({
	fullPath: "",
	hash: "",
	matched: [],
	name: "",
	meta: {},
	params: {},
	path: "",
	query: {
		// @ts-ignore
		id: "4567",
		stage: "1"
	},
	redirectedFrom: undefined,
}))
vi.spyOn(vueRouter, "useRoute").mockImplementationOnce(() => reactive({
	fullPath: "",
	hash: "",
	matched: [],
	name: "",
	meta: {},
	params: {},
	path: "",
	query: {
		// @ts-ignore
		id: "4567",
		stage: "2"
	},
	redirectedFrom: undefined,
}))
vi.spyOn(vueRouter, "useRoute").mockImplementationOnce(() => reactive({
	fullPath: "",
	hash: "",
	matched: [],
	name: "",
	meta: {},
	params: {},
	path: "",
	query: {
		// @ts-ignore
		id: "4567",
		stage: "3"
	},
	redirectedFrom: undefined,
}))
vi.spyOn(vueRouter, "useRoute").mockImplementationOnce(() => reactive({
	fullPath: "",
	hash: "",
	matched: [],
	name: "",
	meta: {},
	params: {},
	path: "",
	query: {
		// @ts-ignore
		id: "4567",
		stage: "4"
	},
	redirectedFrom: undefined,
}))
describe("EditProduct index", () => {
	const sortPrice = vi.fn;
	it("Should render without error", () => {
	  const component = render(EditProduct, {
		global: {
		  stubs: {
		   
			  ProductInfo: true,
			  ProductProperties: true,
			  ProductDocuments: true,
			  AdditionalInformation:true,
			  PreviewIndexPreview: true
		  },
		  provide: {
			company: ref(null),
		  },
		
		},
	  });
	  expect(screen).toMatchSnapshot();
	});
  
  });