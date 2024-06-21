import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Banner from "~/components/Application/Banner.vue";
import Content from "~/components/Application/Content.vue";
import { createTestingPinia } from "@pinia/testing";
import SideBar from "~/components/Application/SideBar.vue";

const store = useProductStore();

describe("Sidebar", () => {
	const component = mount(SideBar, {
		global: {
			provide: {
				query : {
					producers: [],
					applications: [],
					producersData: {}
				}
			}
		}
	});
  it("Mounts without error", () => {
		expect(component.html()).toMatchSnapshot();
  });
});
