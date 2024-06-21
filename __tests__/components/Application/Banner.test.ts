import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Banner from "~/components/Application/Banner.vue";


describe("bannner", () => {

  it("Renders", () => {
    const component = mount(Banner, {
      global: {
        provide: {
          query: {
            sortOrder: "test",
          },
        },
      },
    });
    expect(component.html()).toContain(
      "We found 0 Products” matching your search criteria"
    );
  });
});
