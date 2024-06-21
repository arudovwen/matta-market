import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";

const mockRoutePush = vi.fn();

describe("CompanyAccount", () => {
  vi.mock("vue-router", () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: mockRoutePush,
        };
      },
      useRoute: vi.fn(),
    };
  });
  vi.spyOn(vueRouter, "useRoute").mockImplementation(() => ({
    fullPath: "",
    hash: "",
    matched: [],
    name: "",
    meta: {},
    params: {},
    path: "",
    query: {
      // @ts-ignore
      onboarding_stage: 2,
    },
    redirectedFrom: undefined,
  }));
  it("Renders without error", async () => {
    const component = await render(CompanyAccount, {
      props: {},
    });
    expect(component.html()).toContain("STEP 2/4");
  });
});