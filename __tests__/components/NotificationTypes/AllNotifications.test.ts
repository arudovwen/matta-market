import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import moment from "moment";
import NotificationList from "~/components/NotificationTypes/AllNotifications.vue";

describe("NotificationList.vue", () => {
  let notifications;
  let selectedOption;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-10T12:00:00"));
    notifications = ref([]);
    selectedOption = ref([]);
  });

  const factory = () => {
    return mount(NotificationList, {
      global: {
        provide: {
          notifications,
          selectedOption,
        },
        stubs: {
          Info: true,
          EmptyData: true,
        },
      },
    });
  };

  it("renders EmptyData when there are no notifications", () => {
    const wrapper = factory();
    expect(wrapper.find("empty-data-stub").exists()).toBe(true);
  });

  it("renders notifications grouped by Today", () => {
    notifications.value = [
      {
        id: 1,
        notificationType: "Alert",
        message: "Msg 1",
        notificationDate: "2024-01-10T10:00:00",
        url: "/test",
        isViewed: false,
      },
    ];
    const wrapper = factory();
    expect(wrapper.text()).toContain("Today");
    const info = wrapper.findComponent({ name: "Info" });
    expect(info.props("time")).toContain("ago");
  });

  it("renders notifications grouped by Yesterday", () => {
    notifications.value = [
      {
        id: 2,
        notificationType: "Info",
        message: "Msg 2",
        notificationDate: "2024-01-09T10:00:00",
        url: "/test2",
        isViewed: true,
      },
    ];
    const wrapper = factory();
    expect(wrapper.text()).toContain("Yesterday");
    const info = wrapper.findComponent({ name: "Info" });
    expect(info.props("time")).toBe("Jan 9, 2024");
  });

  it("renders notifications grouped by specific date", () => {
    notifications.value = [
      {
        id: 3,
        notificationType: "Success",
        message: "Msg 3",
        notificationDate: "2023-12-25T10:00:00",
        url: "/test3",
        isViewed: false,
      },
    ];
    const wrapper = factory();
    expect(wrapper.text()).toContain("Dec 25, 2023");
  });

  it("handles empty filtered list while having global notifications", () => {
    notifications.value = [
      {
        id: 1,
        notificationType: "TypeA",
        message: "A",
        notificationDate: "2024-01-10T10:00:00",
      },
    ];
    selectedOption.value = ["TypeB"];
    const wrapper = factory();
    expect(wrapper.find("empty-data-stub").exists()).toBe(true);
  });

  it("verifies multiple notifications in one date group", () => {
    notifications.value = [
      {
        id: 1,
        notificationType: "TypeA",
        message: "A",
        notificationDate: "2024-01-10T10:00:00",
      },
      {
        id: 2,
        notificationType: "TypeA",
        message: "B",
        notificationDate: "2024-01-10T11:00:00",
      },
    ];
    const wrapper = factory();
    const groups = wrapper.findAll("h5");
    expect(groups.length).toBe(1);
    expect(wrapper.findAllComponents({ name: "Info" }).length).toBe(2);
  });
});