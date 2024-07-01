import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import AddProduct from "~/components/Supplier/AddProduct/index.vue";
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

vi.mock("~/services/productservices", () => ({
	getFeaturedManufacturer: vi.fn().mockResolvedValue({
		data: {
		  data: {
			data: [],
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
	getSupplierProduct: vi.fn().mockResolvedValue({
		data: {
		  data: {
			data: [],
			storeSlug: "/images/test-banner.png",
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
    getMarkets: vi.fn().mockResolvedValue({
      data: {
        data: {
			data: [],
          storeSlug: "/images/test-banner.png",
          logo: "/images/test-logo.png",
          storeName: "Test Store",
        },
      },
    }),
	getmarketlevels: vi.fn().mockResolvedValue({
		data: {
		  data: {
			data: [],
			storeSlug: "/images/test-banner.png",
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
	  getTechLevels: vi.fn().mockResolvedValue({
		status: 200,
		data: {
		  data: [
			{
			  product: "Metal rod",
			  soldBy: "Some Guy",
			  amountWithTax: 100000,
			  shippingName: "New Shipping",
			  shippingAddress: "10007 Mountain Drive",
			  orderNumber: "456789",
			},
		  ],
		  totalCount: 1,
		},
	  }),
	updateProperties: vi.fn().mockResolvedValue({
		data: {
		  data: {
			storeSlug: "/images/test-banner.png",
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
	  updateDocuments: vi.fn().mockResolvedValue({
		data: {
		  data: {
			storeSlug: "/images/test-banner.png",
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
	  updateAdditional: vi.fn().mockResolvedValue({
		data: {
		  data: {
			storeSlug: "/images/test-banner.png",
			logo: "/images/test-logo.png",
			storeName: "Test Store",
		  },
		},
	  }),
  }));
describe("AddProduct index", () => {
  const sortPrice = vi.fn;
  it("Should render without error", () => {
    const component = render(AddProduct, {
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
