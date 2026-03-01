import { describe, it, expect, vi, beforeEach } from "vitest";
import * as cartShippingHelpers from "~/services/cartservice";
import urls from "~/helpers/url_helpers";
import {
  marketPost,
  marketGet,
  marketDelete,
  marketPut,
} from "~/helpers/api_helpers";

vi.mock("~/helpers/api_helpers", () => ({
  marketPost: vi.fn(),
  marketGet: vi.fn(),
  marketDelete: vi.fn(),
  marketPut: vi.fn(),
}));

vi.mock("~/store", () => ({
  default: {
    getters: {
      accessToken: "mock-access-token",
    },
  },
}));

vi.mock("~/helpers/url_helpers", () => ({
  default: {
    CREATE_CART: "mock-create-cart-url",
    UPDATE_CART: "mock-update-cart-url",
    REMOVE_CART: "mock-remove-cart-url",
    GET_CART: "mock-get-cart-url",
    ADD_SHIPPING_ADDRESS: "mock-add-shipping-address-url",
    EDIT_SHIPPING_ADDRESS: "mock-edit-shipping-address-url",
    DEFAULT_SHIPPING_ADDRESS: "mock-default-shipping-address-url",
    GET_SHIPPING_ADDRESS: "mock-get-shipping-address-url",
    DELETE_SHIPPING: "mock-delete-shipping-url",
    CONFIRM_PURCHASE: "mock-confirm-purchase-url",
    GET_PICKUP_ADDRESS: "mock-get-pickup-address-url",
    DELETE_PICKUP: "mock-delete-pickup-url",
    ADD_PICKUP_ADDRESS: "mock-add-pickup-address-url",
    EDIT_PICKUP_ADDRESS: "mock-edit-pickup-address-url",
    APPLY_DISCOUNT: "mock-apply-discount-url",
    SHIPPONG_COST_BREAKDOWN: "mock-shipping-cost-breakdown-url",
  },
}));

describe("Cart and Shipping Helpers", () => {
  const expectedConfig = {
    headers: { Authorization: `Bearer mock-access-token` },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call createcart", async () => {
    marketPost.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.createcart({});

    expect(marketPost).toHaveBeenCalledWith(
      urls.CREATE_CART,
      {},
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call updatecart", async () => {
    marketPost.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.updatecart({});

    expect(marketPost).toHaveBeenCalledWith(
      urls.UPDATE_CART,
      {},
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call removecartitem", async () => {
    marketPost.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.removecartitem(456);

    expect(marketPost).toHaveBeenCalledWith(
      `${urls.REMOVE_CART}/456`,
      456,
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call getcart", async () => {
    marketGet.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.getcart();

    expect(marketGet).toHaveBeenCalledWith(
      urls.GET_CART,
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call deletePickupLocation", async () => {
    marketDelete.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.deletePickupLocation("456");

    expect(marketDelete).toHaveBeenCalledWith(
      `${urls.DELETE_PICKUP}/456`,
      "456",
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call editPickupLocation", async () => {
    marketPut.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.editPickupLocation({
      id: "456",
    });

    expect(marketPut).toHaveBeenCalledWith(
      `${urls.EDIT_PICKUP_ADDRESS}/456`,
      { id: "456" },
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call shippingBreakdown", async () => {
    marketGet.mockResolvedValue({ data: "mock-response" });

    const response = await cartShippingHelpers.shippingBreakdown();

    expect(marketGet).toHaveBeenCalledWith(
      urls.SHIPPONG_COST_BREAKDOWN,
      expectedConfig
    );
    expect(response).toEqual({ data: "mock-response" });
  });
});