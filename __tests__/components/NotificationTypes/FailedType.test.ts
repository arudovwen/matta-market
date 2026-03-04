import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FailedType from "@/components/NotificationTypes/FailedType.vue";

describe("FailedType.vue", () => {
  const handleNotificationMock = vi.fn();
  const userIdMock = "user_123";
  const defaultProps = {
    id: "notif_456",
    isViewed: false,
    url: "/details",
    text: "Test Notification",
    time: "2 hours ago",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createComponent = (props = {}) => {
    return mount(FailedType, {
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

  it("renders notification content correctly", () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain(defaultProps.text);
    expect(wrapper.text()).toContain(defaultProps.time);
    const link = wrapper.getComponent({ name: "NuxtLink" });
    expect(link.props("to")).toBe(defaultProps.url);
  });

  it("applies font-medium and shows circle icon when isViewed is false", () => {
    const wrapper = createComponent({ isViewed: false });
    const textParagraph = wrapper.find("p.text-xs");
    expect(textParagraph.classes()).toContain("font-medium");
    expect(wrapper.find(".uil-circle").exists()).toBe(true);
  });

  it("applies font-normal and hides circle icon when isViewed is true", () => {
    const wrapper = createComponent({ isViewed: true });
    const textParagraph = wrapper.find("p.text-xs");
    expect(textParagraph.classes()).toContain("font-normal");
    expect(wrapper.find(".uil-circle").exists()).toBe(false);
  });

  it("triggers handleNotification with correct data on click", async () => {
    const wrapper = createComponent();
    await wrapper.trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({
      userId: userIdMock,
      id: defaultProps.id,
    });
  });
});