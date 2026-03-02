// notification_helpers.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as notificationHelpers from "~/services/notificationservice";
import { notificationGet as get, notificationPost as post } from "~/helpers/api_helpers";

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
    GET_NOTIFICATION: "mock-get-notification-url",
    MARK_NOTIFICATION: "mock-mark-notification-url",
    MARK_ALL_NOTIFICATION: "mock-mark-all-notification-url",
  },
}));

describe("Notification Helper Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call getnotifications with the correct URL and config", async () => {
    const mockData = {
      PageNumber: 1,
      PageSize: 10,
      BusinessId: "mock-business-id",
      UserId: "mock-user-id",
      Role: "mock-role",
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await notificationHelpers.getnotifications(mockData);

    expect(get).toHaveBeenCalledWith(
      expect.stringContaining("mock-get-notification-url"),
      expect.objectContaining({
        headers: { Authorization: "Bearer mock-access-token" }
      })
    );
    expect(get).toHaveBeenCalledWith(expect.stringContaining("PageNumber=1"), expect.anything());
    expect(get).toHaveBeenCalledWith(expect.stringContaining("PageSize=10"), expect.anything());

    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call marknotification with the correct URL, data, and config", async () => {
    const mockData = { someKey: "someValue" };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await notificationHelpers.marknotification(mockData);

    expect(post).toHaveBeenCalledWith(
      "mock-mark-notification-url",
      mockData,
      expect.objectContaining({
        headers: { Authorization: "Bearer mock-access-token" }
      })
    );
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call markallnotification with the correct URL, data, and config", async () => {
    const mockData = { someKey: "someValue" };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await notificationHelpers.markallnotification(mockData);

    expect(post).toHaveBeenCalledWith(
      "mock-mark-all-notification-url",
      mockData,
      expect.objectContaining({
        headers: { Authorization: "Bearer mock-access-token" }
      })
    );
    expect(response).toEqual({ data: "mock-response" });
  });
});
