// order_helpers.test.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as orderHelpers from "~/services/settlementservice";
// import urls from "~/helpers/url_helpers";
import { get, post, del, put } from "~/helpers/api_helpers";
import store from "~/store";

// Mock store and helpers
vi.mock("~/helpers/api_helpers", async (importOriginal) => {
  const actual = await importOriginal();
  const mockGet = vi.fn();
  const mockPost = vi.fn();
  const mockPut = vi.fn();
  const mockDel = vi.fn();
  return {
    ...actual,
    get: mockGet,
    post: mockPost,
    put: mockPut,
    del: mockDel,
    walletGet: mockGet,
    walletPost: mockPost,
    walletPut: mockPut,
    walletDelete: mockDel,
    marketGet: mockGet,
    marketPost: mockPost,
    marketPut: mockPut,
    marketDelete: mockDel,
    ssoGet: mockGet,
    ssoPost: mockPost,
    ssoPut: mockPut,
    ssoDelete: mockDel,
    oxdideGet: mockGet,
    oxdidePost: mockPost,
    oxdidePut: mockPut,
    oxdideDelete: mockDel,
    deltaGet: mockGet,
    deltaPost: mockPost,
    deltaPut: mockPut,
    deltaDelete: mockDel,
    currencyGet: mockGet,
    currencyPost: mockPost,
    currencyPut: mockPut,
    currencyDelete: mockDel,
    notificationGet: mockGet,
    notificationPost: mockPost,
    notificationPut: mockPut,
    notificationDelete: mockDel,
  };
});

vi.mock("~/store", () => ({
  default: {
    getters: {
      accessToken: "mock-access-token",
      userId: 1,
    },
  },
}));
vi.mock("~/helpers/url_helpers", () => ({
  default: {
    VIEW_SETTLEMENT: "mock-view-settlement-url",
    AUTO_SETTLEMENT_VALUE: "mock-auto-settlement-value-url",
    ADD_SETTLEMENT: "mock-add-settlement-url",
    UPDATE_SETTLEMENT: "mock-update-settlement-url",
    DELETE_SETTLEMENT: "mock-delete-settlement-url",
    VALIDATE_BVN: "mock-validate-bvn-url",
    VALIDATE_ACCOUNT: "mock-validate-account-url",
    AUTO_SETTLEMENT: "mock-auto-settlement-url",
    GET_BANKS: "mock-get-banks-url",
  },
}));

describe("Order Helper Functions", () => {
  const mockAccessToken = "mock-access-token";

  beforeEach(() => {
    vi.clearAllMocks();
    store.getters = {
      accessToken: mockAccessToken,
    };
  });

  // Test for viewSettlement function
  it("should call viewSettlement with the correct URL and data", async () => {
    const mockData = { id: "mock-id" };
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.viewSettlement(mockData);

    expect(get).toHaveBeenCalledWith(
      `mock-view-settlement-url`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for getAutoSettlement function
  it("should call getAutoSettlement with the correct URL", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.getAutoSettlement();

    expect(get).toHaveBeenCalledWith(
      "mock-auto-settlement-value-url", expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for addSettlement function
  it("should call addSettlement with the correct URL and data", async () => {
    const mockData = { id: "mock-id", someData: "mock-data" };
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.addSettlement(mockData);

    expect(post).toHaveBeenCalledWith(
      `mock-add-settlement-url`,
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for updateSettlement function
  it("should call updateSettlement with the correct URL and data", async () => {
    const mockData = {
      id: "mock-id",
      settlementId: "mock-settlement-id",
      someData: "mock-data",
    };
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    put.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.updateSettlement(mockData);

    expect(put).toHaveBeenCalledWith(
      `mock-update-settlement-url/${mockData.id}`,
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for deleteSettlement function
  it("should call deleteSettlement with the correct URL and data", async () => {
    const mockData = { id: "mock-id", settlementId: "mock-settlement-id" };
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    del.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.deleteSettlement(mockData);

    expect(del).toHaveBeenCalled();
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for autoSettlement function
  it("should call autoSettlement with the correct URL and data", async () => {
    const mockData = { id: "mock-id", someData: "mock-data" };
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.autoSettlement(mockData);

    expect(post).toHaveBeenCalledWith(
      `mock-auto-settlement-url`,
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Test for getBanks function
  it("should call getBanks with the correct URL", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await orderHelpers.getBanks();

    expect(get).toHaveBeenCalledWith("mock-get-banks-url", expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });
});
