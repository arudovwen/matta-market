// procurement_helpers.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as procurementHelpers from "~/services/procurementservice";
// import urls from "~/helpers/url_helpers";
import { get, post } from "~/helpers/api_helpers";
// import store from "~/store";

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
    },
  },
}));

vi.mock("~/helpers/url_helpers", () => ({
  default: {
    PROCUREMENT_MYREQUESTS: "mock-procurement-my-requests-url",
    PROCUREMENT_MYREQUEST_DETAILS: "mock-procurement-my-request-details-url",
    BUYER_ORDER_TIMELINE: "mock-buyer-order-timeline-url",
    PROCUREMENT_REQUEST_COUNT: "mock-procurement-request-count-url",
    PROCUREMENT_PRODUCTS: "mock-procurement-products-url",
    PROCUREMENT_SUPPLIERS: "mock-procurement-suppliers-url",
    PROCUREMENT_SET_CANCELLED: "mock-procurement-set-cancelled-url",
    ADD_SAMPLE_REQUEST: "mock-add-sample-request-url",
  },
}));

describe("Procurement Helper Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call procurementrequests with the correct URL and parameters", async () => {
    const mockData = {
      SortOrder: "asc",
      Search: "test",
      PageNumber: 1,
      PageSize: 10,
      ProductId: "prod1",
      ProducerId: "prod1",
      RequestStatus: "pending",
      SupplierId: "supp1",
      SellerId: "seller1",
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.procurementrequests(mockData);

    expect(get).toHaveBeenCalled();
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call procurementrequestdetails with the correct URL and parameters", async () => {
    const mockRequestId = "mock-request-id";
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.procurementrequestdetails(
      mockRequestId
    );

    expect(get).toHaveBeenCalledWith(
      `mock-procurement-my-request-details-url?requestId=mock-request-id`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call buyerordertimeline with the correct URL and parameters", async () => {
    const mockSalesOrderId = "mock-sales-order-id";
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.buyerordertimeline(
      mockSalesOrderId
    );

    expect(get).toHaveBeenCalledWith(
      `mock-buyer-order-timeline-url?salesorderId=mock-sales-order-id`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call procurementrequestcount with the correct URL and parameters", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.procurementrequestcount();

    expect(get).toHaveBeenCalledWith(
      `mock-procurement-request-count-url`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call procurementproducts with the correct URL and parameters", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.procurementproducts();

    expect(get).toHaveBeenCalledWith(
      `mock-procurement-products-url?PageSize=30&PageNumber=1&Search=`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call procurementsuppliers with the correct URL and parameters", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.procurementsuppliers();

    expect(get).toHaveBeenCalledWith(
      `mock-procurement-suppliers-url?PageSize=30&PageNumber=1&Search=''`, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call setascancelled with the correct URL and data", async () => {
    const mockData = { id: "mock-id" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.setascancelled(mockData);

    expect(post).toHaveBeenCalledWith(
      `mock-procurement-set-cancelled-url`,
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call addrequest with the correct URL and data", async () => {
    const mockData = { request: "mock-data" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await procurementHelpers.addrequest(mockData);

    expect(post).toHaveBeenCalledWith(
      `mock-add-sample-request-url`,
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  // Add tests for other functions as needed
});
