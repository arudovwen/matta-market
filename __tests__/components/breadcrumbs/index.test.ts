import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Banner from "~/components/Application/Banner.vue";
import Content from "~/components/Application/Content.vue";
import { createTestingPinia } from "@pinia/testing";
import index from "~/components/Breadcrumbs/index.vue";

const store = useProductStore();

describe("Breadcrubms index", () => {

  const component = mount(index, {
    props: {
      links: [
        {
          title: "Home",
          url: "/home",
        },
        {
          title: "Markets",
          url: "/markets",
        },
      ],
    },
  });
  it("Mounts without error", () => {
    expect(component.html()).toMatchSnapshot();
  });
});
