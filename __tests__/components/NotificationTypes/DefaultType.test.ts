import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DefaultType from "~/components/NotificationTypes/DefaultType.vue";

describe("DefaultType.vue", () => {
  const handleNotificationMock = vi.fn();
  const defaultProps = {
    id: "123",
    isViewed: false,
    url: "/test-url",
    text: "Notification Text",
    time: "2023-10-27T10:00:00Z",
    type: 0,
  };

  beforeEach(() => {
    handleNotificationMock.mockClear();
  });

  const createComponent = (props = {}) => {
    return mount(DefaultType, {
      props: { ...defaultProps, ...props },
      global: {
        provide: {
          handleNotification: handleNotificationMock,
        },
      },
    });
  };

  it("renders type 0 icon correctly", () => {
    const wrapper = createComponent({ type: 0 });
    expect(wrapper.find(".uil-bag").exists()).toBe(true);
  });

  it("renders type 1 icon correctly", () => {
    const wrapper = createComponent({ type: 1 });
    expect(wrapper.find(".uil-box").exists()).toBe(true);
  });

  it("renders type 2 icon correctly", () => {
    const wrapper = createComponent({ type: 2 });
    expect(wrapper.find(".uil-file").exists()).toBe(true);
  });

  it("renders type 3 icon correctly", () => {
    const wrapper = createComponent({ type: 3 });
    expect(wrapper.find(".uil-shop").exists()).toBe(true);
  });

  it("handles unviewed state styling and icons", () => {
    const wrapper = createComponent({ isViewed: false });
    const textElement = wrapper.find("p.text-sm");
    expect(textElement.classes()).toContain("font-medium");
    expect(wrapper.findAll(".uil-circle").length).toBe(1);
    expect(wrapper.find(".group-hover\\:text-primary").exists()).toBe(true);
  });

  it("handles viewed state styling and icons", () => {
    const wrapper = createComponent({ isViewed: true });
    const textElement = wrapper.find("p.text-sm");
    expect(textElement.classes()).toContain("font-normal");
    const circle = wrapper.find(".uil-circle");
    expect(circle.exists()).toBe(true);
    expect(circle.classes()).not.toContain("group-hover:text-primary");
  });

  it("displays the formatted time correctly", () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain("Oct 27, 2023 11:00 AM");
  });

  it("calls handleNotification with correct id on click", async () => {
    const wrapper = createComponent();
    await wrapper.trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({ id: "123" });
  });

  it("renders the notification text prop", () => {
    const wrapper = createComponent({ text: "Specific Message" });
    expect(wrapper.text()).toContain("Specific Message");
  });
});