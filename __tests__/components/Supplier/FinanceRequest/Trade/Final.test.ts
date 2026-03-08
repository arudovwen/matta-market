import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Final from "@/components/Supplier/FinanceRequest/Trade/Final.vue";

const mockUseRoute = (params: Record<string, any>) => ({
  useRoute: () => ({ params }),
});

describe("Final.vue", () => {
  it("renders sent heading when financeId is not present", () => {
    const wrapper = mount(Final, {
      global: {
        mocks: mockUseRoute({}),
        stubs: {
          AppButton: {
            template: "<button />",
            props: ["link", "text", "btnClass", "type"],
          },
        },
      },
    });
    expect(wrapper.find("h1").text()).toContain("Sent");
    expect(wrapper.find("img").attributes("alt")).toBe("Final");
    expect(wrapper.find("p").exists()).toBe(true);
  });
});