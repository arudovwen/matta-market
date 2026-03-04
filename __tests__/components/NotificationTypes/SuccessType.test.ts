import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SuccessType from "@/components/NotificationTypes/SuccessType.vue";

describe("SuccessType.vue", () => {
  const handleNotificationMock = vi.fn();
  const userIdMock = "user_456";
  const defaultProps = {
    id: "success_001",
    isViewed: false,
    url: "/success-details",
    text: "Transaction successful",
    time: "1 min ago",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createComponent = (props = {}) => {
    return mount(SuccessType, {
      props: { ...defaultProps, ...props },
      global: {
        provide: {
          handleNotification: handleNotificationMock,
          userId: userIdMock,
        },
      },
    });
  };

  it("renders the success icon and notification text", () => {
    const wrapper = createComponent();
    expect(wrapper.find(".uit-arrow-circle-up").exists()).toBe(true);
    expect(wrapper.text()).toContain(defaultProps.text);
    expect(wrapper.text()).toContain(defaultProps.time);
  });

  it("applies font-medium and shows green circle when isViewed is false", () => {
    const wrapper = createComponent({ isViewed: false });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-medium");
    expect(wrapper.find(".uil-circle").exists()).toBe(true);
  });

  it("applies font-normal and hides green circle when isViewed is true", () => {
    const wrapper = createComponent({ isViewed: true });
    expect(wrapper.find("p.text-xs").classes()).toContain("font-normal");
    expect(wrapper.find(".uil-circle").exists()).toBe(false);
  });

  it("calls handleNotification on click of the inner container", async () => {
    const wrapper = createComponent();
    await wrapper.find(".flex.items-start").trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({
      userId: userIdMock,
      id: defaultProps.id,
    });
  });
});