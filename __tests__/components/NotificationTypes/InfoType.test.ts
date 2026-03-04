import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InfoType from "~/components/NotificationTypes/InfoType.vue";

describe("InfoType.vue", () => {
  const handleNotificationMock = vi.fn();
  const defaultProps = {
    id: "99",
    isViewed: false,
    url: "/details/99",
    text: "Notification Text",
    time: "10:00 AM",
    type: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createComponent = (props = {}) => {
    return mount(InfoType, {
      props: { ...defaultProps, ...props },
      global: {
        provide: {
          handleNotification: handleNotificationMock,
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

  it("renders type 0 icon (uil-bag)", () => {
    const wrapper = createComponent({ type: 0 });
    expect(wrapper.find(".uil-bag").exists()).toBe(true);
  });

  it("renders type 1 icon (uil-box)", () => {
    const wrapper = createComponent({ type: 1 });
    expect(wrapper.find(".uil-box").exists()).toBe(true);
  });

  it("renders type 2 icon (uil-file)", () => {
    const wrapper = createComponent({ type: 2 });
    expect(wrapper.find(".uil-file").exists()).toBe(true);
  });

  it("renders type 3 icon (uil-shop)", () => {
    const wrapper = createComponent({ type: 3 });
    expect(wrapper.find(".uil-shop").exists()).toBe(true);
  });

  it("renders type 4 icon (uil-megaphone) and NuxtLink", () => {
    const wrapper = createComponent({ type: 4 });
    expect(wrapper.find(".uil-megaphone").exists()).toBe(true);
    const link = wrapper.getComponent({ name: "NuxtLink" });
    expect(link.props("to")).toBe(defaultProps.url);
  });

  it("applies unviewed styles correctly", () => {
    const wrapper = createComponent({ isViewed: false });
    const textPara = wrapper.findAll("p")[1];
    expect(textPara.classes()).toContain("font-medium");
    expect(textPara.classes()).toContain("text-[#333]");
    expect(wrapper.find(".group-hover\\:text-primary").exists()).toBe(true);
  });

  it("applies viewed styles correctly", () => {
    const wrapper = createComponent({ isViewed: true });
    const textPara = wrapper.findAll("p")[1];
    expect(textPara.classes()).toContain("font-normal");
    expect(textPara.classes()).toContain("text-[#666]");
    const circle = wrapper.find(".uil-circle");
    expect(circle.exists()).toBe(true);
    expect(circle.classes()).not.toContain("group-hover:text-primary");
  });

  it("triggers handleNotification on click", async () => {
    const wrapper = createComponent();
    await wrapper.trigger("click");
    expect(handleNotificationMock).toHaveBeenCalledWith({ id: "99" });
  });

  it("displays time and text correctly", () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain(defaultProps.time);
    expect(wrapper.text()).toContain(defaultProps.text);
  });
});