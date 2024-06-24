import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import index from "~/components/Supplier/FinanceRequest/Trade/index.vue";
import * as settingServices from "~/services/settingservices";
// import userEvent from "@testing-library/user-event"

const mockRoutePush = vi.fn();

describe("FinanceRequestTradeIndex", () => {
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
    params: {
      financeId: "56789876",
      type: "Wahala",
      id: "12345654",
    },
    path: "",
    query: {
      // @ts-ignore
      onboarding_stage: 1,
    },
    redirectedFrom: undefined,
  }));

  // vi.mock("~/services/settingservices", () => ({}))
  vi.spyOn(settingServices, "getCompanyProfile").mockRejectedValue({
    status: 400,
  });

  it("Renders without error", async () => {
    const component = render(index, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
    expect(component.html()).toContain("How much do you require?");
    await fireEvent.update(screen.getByTestId("currency-input"), "20000");
		await fireEvent.select(screen.getByText("7 days"))
		await fireEvent.change(screen.getByTestId('select'), { target: { value: 7 } })
		// await userEvent.click(screen.getByRole("combobox"))
		
    await fireEvent.update(screen.getByPlaceholderText(""), "Somewhere");
    await waitFor(() => fireEvent.click(screen.getByText("Next")));
		// await retry(() => expect(screen.queryByText("How much do you require?")).toBeNull())

  });
});
