// CongratulationsComponent.test.js
import { mount } from "@vue/test-utils";
import CongratulationsComponent from "~/components/onboarding/CongratulationComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, beforeEach } from "vitest";
import type { Plugin } from "vue";

describe("CongratulationsComponent", () => {
  let router: Plugin | [Plugin, ...any[]];

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/overview", component: { template: "<div>Overview</div>" } },
      ],
    });
  });

  it("renders correctly", async () => {
    const wrapper = mount(CongratulationsComponent, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find(".uil-check-circle").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Congratulations!");
    expect(wrapper.find("p").text()).toBe(
      "Thank you! We will contact you shortly to verify your account."
    );
    expect(wrapper.find("button").text()).toBe("Proceed to dashboard");
  });
});
