import { createTestingPinia } from "@pinia/testing";
import { render, screen, fireEvent } from "@testing-library/vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore } from "vuex";
import ProductContent from "~/components/preview/ProductContent.vue";
import Detail from "~/components/product/Detail.vue";

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
      params: {
        category: "testcat",
      },
      path: "",
      query: {
        // @ts-ignore
        onboarding_stage: 2,
      },
      redirectedFrom: undefined,
    })),
  };
});

describe("ProductContent", () => {
  it("renders", async () => {
    const component = render(ProductContent, {
      global: {
        plugins: [
          store,
          createTestingPinia({
            initialState: {},
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          product: {
            hidePrice: false,
            gallery: ["/test-img.png"],
            featuredPhoto: "/test-img.png",
            manufacturer: "Stark Industries",
            id: "678908",
            name: "Mark 47",
            packagesAvailable: ["PkgOne", "PkgTwo", "PkgThree"],
            producer: { title: "Person" },
          },
        },
      },
    });
    // expect(component.html()).toContain("Request quote");
  });
});
// describe("Detail", () => {
//   it("renders", async () => {
//     const component = render(Detail, {
//       global: {
//         plugins: [
//           store,
//           createTestingPinia({
//             initialState: {
//               product: {
//                 hidePrice: false,
//                 gallery: [""],
//                 manufacturer: "Stark Industries",
//                 id: "678908",
//                 name: "Mark 47",
//               },
//             },
//           }),
//         ],
//         stubs: {
//           RouterLink: RouterLinkStub,
//         },
//         provide: {
//           isLoading: true,
//         },
//       },
//     });

//     component.unmount();
//   });
// });
