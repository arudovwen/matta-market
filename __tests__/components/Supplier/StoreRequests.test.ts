import { mount, flushPromises } from "@vue/test-utils";
import StoreRequests from "@/components/Supplier/StoreRequests.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import { vi } from "vitest";
import * as api from "~/services/quoteservice";

// Mock sellerquotes API
vi.mock("~/services/quoteservice", () => ({
  sellerquotes: vi.fn(),
}));

// Mock Pinia store if used inside component
vi.mock("@/store/supplierStore", () => ({
  useSupplierStore: () => ({
    quoteParams: { totalCount: 0, query: {} },
    count: { quotes: 0 },
  }),
}));

describe("StoreRequests", () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
  });

  it("Renders without error", async () => {
    (api.sellerquotes as any).mockResolvedValue({
      data: { data: { totalCount: 0, data: [] } },
    });

    const wrapper = mount(StoreRequests, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises(); // wait for all promises to resolve (mounted API calls)
    expect(wrapper.exists()).toBe(true);
  });
});