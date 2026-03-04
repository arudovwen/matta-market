import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PendingType from "@/components/NotificationTypes/PendingType.vue";

describe("PendingType.vue", () => {
  const handleNotificationMock = vi.fn();
  const userIdMock = "user_789";
  const defaultProps = {
    id: "warn_001",
    isViewed: false,
    url: "/warning-details",
    text: "Potential security risk detected",
    time: "10 mins ago",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createComponent = (props = {}) => {
    return mount(PendingType, {
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

  it("renders the warning icon and content", () => {
    const wrapper = createComponent();
    expect(wrapper.find(".uil-info-circle").exists()).toBe(true);
    expect(wrapper.text()).toContain(defaultProps.text);
    expect(wrapper.text()).toContain(defaultProps.time);
  });

  it("binds the correct URL to NuxtLink", () => {
    const wrapper = createComponent();
    const link = wrapper.getComponent({ name: "NuxtLink" });
    expect(link.props("to")).toBe(defaultProps.url);
  });

  it("applies font-medium and shows indicator when isViewed is false", () => {
    const wrapper = createComponent({ isViewed: false });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-medium");
    expect(wrapper.find(".uil-circle").exists()).toBe(true);
  });

  it("applies font-normal and hides indicator when isViewed is true", () => {
    const wrapper = createComponent({ isViewed: true });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-normal");
    expect(wrapper.find(".uil-circle").exists()).toBe(false);
  });

  it("calls handleNotification with userId and id on click", async () => {
    const wrapper = createComponent();
    await wrapper.trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({
      userId: userIdMock,
      id: defaultProps.id,
    });
  });
});