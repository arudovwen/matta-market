// company_helpers.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as companyHelpers from "~/services/onboardingservices";
// import urls from '~/helpers/url_helpers';
import { post, get } from "~/helpers/api_helpers";
// import store from '~/store';

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
    COMPANY_UPDATE_PERSONAL_INFO: "mock-update-personal-info-url",
    COMPANY_UPDATE_ADDITIONAL_INFORMATION: "mock-update-additional-info-url",
    COMPANY_INVITE_USERS: "mock-invite-users-url",
    GET_ONBOARDING_INFO: "mock-get-onboarding-info-url",
    UPLOAD_FILE: "mock-upload-file-url",
    UPLOAD_DOCUMENT: "mock-upload-document-url",
    SETONBOARDING_COMPLETE: "mock-set-onboarding-complete-url",
    SET_ACCOUNT_TYPE: "mock-set-account-type-url",
  },
}));

describe("Company Helper Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call updatePersonalInfo with the correct URL, user data, and config", async () => {
    const mockUser = { name: "John Doe" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.updatePersonalInfo(mockUser);

    expect(post).toHaveBeenCalledWith(
      "mock-update-personal-info-url",
      mockUser, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call additionalInfo with the correct URL, user data, and config", async () => {
    const mockUser = { info: "Additional info" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.additionalInfo(mockUser);

    expect(post).toHaveBeenCalledWith(
      "mock-update-additional-info-url",
      mockUser, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call inviteUsers with the correct URL, user data, and config", async () => {
    const mockUser = { email: "user@example.com" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.inviteUsers(mockUser);

    expect(post).toHaveBeenCalledWith(
      "mock-invite-users-url",
      mockUser, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call getOnboarding with the correct URL and config", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    get.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.getOnboarding();

    expect(get).toHaveBeenCalledWith(
      "mock-get-onboarding-info-url", expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call uploadfile with the correct URL, data, and config", async () => {
    const mockData = { file: "mock-file" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.uploadfile(mockData);

    expect(post).toHaveBeenCalledWith(
      "mock-upload-file-url",
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call uploaddocument with the correct URL, data, and config", async () => {
    const mockData = { document: "mock-document" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.uploaddocument(mockData);

    expect(post).toHaveBeenCalledWith(
      "mock-upload-document-url",
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call setOnboardingcomplete with the correct URL, empty data, and config", async () => {
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.setOnboardingcomplete();

    expect(post).toHaveBeenCalledWith(
      "mock-set-onboarding-complete-url",
      "", expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });

  it("should call setaccountype with the correct URL, data, and config", async () => {
    const mockData = { type: "business" };
    const expectedConfig = {
      headers: { Authorization: `Bearer mock-access-token` },
    };

    post.mockResolvedValue({ data: "mock-response" });

    const response = await companyHelpers.setaccountype(mockData);

    expect(post).toHaveBeenCalledWith(
      "mock-set-account-type-url",
      mockData, expect.anything());
    expect(response).toEqual({ data: "mock-response" });
  });
});
