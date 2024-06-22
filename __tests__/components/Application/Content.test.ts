import { render, screen } from '@testing-library/vue'
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Banner from "~/components/Application/Banner.vue";
import Content from "~/components/Application/Content.vue";
import { createTestingPinia } from "@pinia/testing";

const store = useProductStore();

describe("ApplicationContent", () => {
	const component = render(Content, {
		global: {
			plugins: [createTestingPinia({createSpy: vi.fn})]
		}
	});
  it("Mounts without error", () => {
  });
});
