import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import { it, expect, describe, vi, afterEach } from "vitest";
import CompanyAccount from "~/components/onboarding/CompanyAccount.vue";
import { RouterLinkStub, flushPromises, mount } from "@vue/test-utils";
import { not } from "@vuelidate/validators";
import * as vueRouter from "vue-router";
import Information from "~/components/onboarding/company/Information.vue";
import MyRequests from "~/components/Supplier/MyRequests.vue";
import * as procurementService from "~/services/procurementservice";
import * as reqservices from "~/services/requestservice";
import StoreRequests from "~/components/Supplier/StoreRequests.vue";

const mockRoutePush = vi.fn();

vi.mock("~/services/procurementservice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    samplerequests: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          data: [
            {
              productName: "Joy",
              producer: "Pheelz",
              created: new Date("12/12/12"),
              requestStatus: 1,
              status: 3,
            },
            {
              productName: "Aquafina",
              producer: "Young Jonn",
              created: new Date("12/12/23"),
              requestStatus: 2,
              status: 1,
            },
          ],
          totalCount: 2,
        },
      },
    }),
    procurementproducts: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          data: [
            {
              productId: "45678987",
              productName: "TestProductOne",
            },
            {
              productId: "456987",
              productName: "Fefenefrine",
            },
          ],
        },
      },
    }),
    procurementsuppliers: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        data: {
          data: [
            {
              supplierId: "987656789",
              supplier: "CC Penni",
            },
            {
              supplierId: "9876789",
              supplier: "Fireboy's Dealer",
            },
          ],
        },
      },
    }),
  };
});

vi.spyOn(reqservices, "sellerdoc").mockResolvedValue({
  data: {
    data: {
      data: [
        {
          productName: "Lumefantrine",
          producer: "Some Guy",
          type: "chemical",
          created: new Date(),
        },
        {
          productName: "Water",
          producer: "Some Other Guy",
          type: "chemical",
          created: new Date(),
        },
      ],
      isLoading: false,
      totalData: {},
      totalCount: 2,
    },
  },
});
  describe("StoreRequests", () => {
    it("Renders without error", async () => {
      const component = render(StoreRequests, {
        global: {
          provide: {
            active: 2,
            companyInfo: ref({
              directors: [],
              approvalStatus: true,
            }),
          },
        },
      });
      expect(screen.getByTestId("spinner")).toBeTruthy();
			screen.debug();
      // await waitForElementToBeRemoved(screen.getByTestId("spinner")).then(
      //   async () => {
      //     expect(screen.getByText("Joy")).toBeTruthy();
      //     fireEvent.click(screen.getByTestId("documents")).then(() => {
      //       screen.debug();
      //     });
      //   }
      // );
    });
  });
