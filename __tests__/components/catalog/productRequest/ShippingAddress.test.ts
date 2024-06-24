import { fireEvent, render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import DashboardHeader from "~/components/DashboardHeader.vue";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";
import * as cartService from "~/services/cartservice";
import ShippingAddress from "~/components/catalog/productRequest/ShippingAddress.vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  // helpers,
  // minLength,
  // maxLength,
} from "@vuelidate/validators";

describe("ShippingAddress", () => {
  vi.spyOn(authServices, "logOut").mockReturnValue({
    then: function <TResult1 = void, TResult2 = never>(
      onfulfilled?:
        | ((value: void) => TResult1 | PromiseLike<TResult1>)
        | null
        | undefined,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | null
        | undefined
    ): Promise<TResult1 | TResult2> {
      throw new Error("Function not implemented.");
    },
    catch: function <TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | null
        | undefined
    ): Promise<void | TResult> {
      throw new Error("Function not implemented.");
    },
    finally: function (
      onfinally?: (() => void) | null | undefined
    ): Promise<void> {
      throw new Error("Function not implemented.");
    },
    [Symbol.toStringTag]: "",
  });
  vi.spyOn(cartService, "getalladdress").mockResolvedValue({
    data: {
      data: [
        {
          firstName: "Bruce",
          lastName: "Wayne",
          country: "United States of America",
          street: "Mountain Drive",
        },
      ],
    },
  });

  const myrules2 = {
    email: { required, email },
    phone: { required, numeric },
    shippingAddressId: { required },
    addressDescription: { required },
  };

  it("renders", async () => {
    const component = render(ShippingAddress, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        provide: {
          request2$: useVuelidate(myrules2, {
            sellerId: "",
            seller: "",
            productId: "",
            productImg: "",
            productName: "",
            producerId: "",
            producer: "",
            numberofSamples: 1,
            expectedAnualUsage: 1,
            description: "None",
            email: "",
            phone: "",
            shippingAddressId: null,
            addressDescription: "",
          }),
          sampleForm: {
            shippingAddressId: "1",
          },
        },
      },
    });
    expect(component.html()).toContain("Choose your shipping adress...");
    await fireEvent.click(screen.getByText("Choose your shipping adress..."));
    component.unmount();
  });
});
