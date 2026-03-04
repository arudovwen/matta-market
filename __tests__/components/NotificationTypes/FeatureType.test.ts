import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FeatureType from "~/components/NotificationTypes/FeatureType.vue";

describe("FeatureType.vue", () => {
  const handleNotificationMock = vi.fn();
  const userIdMock = "user_999";
  const defaultProps = {
    id: "notif_001",
    isViewed: false,
    url: "/promotion",
    text: "New Promotion Available",
    time: "5 minutes ago",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createComponent = (props = {}) => {
    return mount(FeatureType, {
      props: { ...defaultProps, ...props },
      global: {
        provide: {
          handleNotification: handleNotificationMock,
          userId: userIdMock,
        },
        stubs: {
          NuxtLink: {
            name: "NuxtLink",
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
      },
    });
  };

  it("renders text and time correctly", () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain(defaultProps.text);
    expect(wrapper.text()).toContain(defaultProps.time);
  });

  it("sets correct destination for NuxtLink", () => {
    const wrapper = createComponent();
    const link = wrapper.getComponent({ name: "NuxtLink" });
    expect(link.props("to")).toBe(defaultProps.url);
  });

  it("applies unviewed styles and shows notification indicator", () => {
    const wrapper = createComponent({ isViewed: false });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-medium");
    expect(wrapper.find(".uil-circle").exists()).toBe(true);
  });

  it("applies viewed styles and hides notification indicator", () => {
    const wrapper = createComponent({ isViewed: true });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-normal");
    expect(wrapper.find(".uil-circle").exists()).toBe(false);
  });

  it("executes markNotification on click with correct payload", async () => {
    const wrapper = createComponent();
    await wrapper.trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({
      userId: userIdMock,
      id: defaultProps.id,
    });
  });

  it("renders the megaphone icon", () => {
    const wrapper = createComponent();
    expect(wrapper.find(".uil-megaphone").exists()).toBe(true);
  });
});