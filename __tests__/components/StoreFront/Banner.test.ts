import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { getStoreInfo } from "~/services/productservices";
import { mount, RouterLinkStub } from "@vue/test-utils";
import Banner from "~/components/Storefront/Banner.vue";
import { createTestingPinia } from "@pinia/testing";
import { useRoute, RouterLinkStub } from "vue-router";

it("Mounts without error", async () => {
  vi.mock("@/services/productservices", () => ({
    getStoreInfo: vi.fn().mockResolvedValue({
      data: {
        bannerUrl: "/images/test-banner.png",
        logo: "/images/test-logo.png",
        storeName: "Test Store",
      },
    }),
  }));
  // Mock the routerf
  vi.mock("vue-router", () => ({
    useRoute: () => ({
      params: { vendor: "test-vendor" },
    }),
    RouterLinkStub: {},
  }));
  const component = render(Banner, {
    global: {
      plugins: [createTestingPinia()],
      stubs: {
        RouterLink: RouterLinkStub,
      },
      provide: {
        query: { sortOrder: 0 },
        vendorInfo: ref(null),
      },
    },
  });

  expect(screen).toMatchSnapshot();
  component.unmount();
});
