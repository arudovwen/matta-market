import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Banner from "../../../components/Application/Banner.vue";


describe("bannner", () => {

  it("Renders", () => {
    const component = render(Banner, {
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
		component.unmount()
  });
});
