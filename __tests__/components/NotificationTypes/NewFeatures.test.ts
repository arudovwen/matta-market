import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NewFeatures from "@/components/NotificationTypes/NewFeatures.vue";

describe("NewFeatures.vue", () => {
  const factory = () => {
    return mount(NewFeatures, {
      global: {
        stubs: {
          Feature: {
            name: "Feature",
            template: '<div class="feature-stub">{{ text }}</div>',
            props: ["url", "text", "time"]
          },
          EmptyData: {
            name: "EmptyData",
            template: '<div class="empty-stub">{{ title }}</div>',
            props: ["title"]
          }
        }
      }
    });
  };

  it("renders EmptyData when Notifications array has items due to ! length logic", () => {
    const wrapper = factory();
    const empty = wrapper.findComponent({ name: "EmptyData" });
    expect(empty.exists()).toBe(true);
    expect(empty.props("title")).toBe("No new feature");
  });

  it("contains the hardcoded Notifications data structure in script", () => {
    const wrapper = factory();
    const vm = wrapper.vm;
    expect(Array.isArray(vm.Notifications)).toBe(true);
    expect(vm.Notifications[0].date).toBe("Today");
    expect(vm.Notifications[0].content[0].type).toBe("feature");
  });
});