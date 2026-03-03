import { describe, it, expect, beforeEach, vi } from "vitest";
import * as settingServices from "~/services/settingservices";
import { get, post, ssoGet, ssoPut } from "~/helpers/api_helpers";
import store from "~/store";

vi.mock("~/helpers/api_helpers", () => ({
  get: vi.fn(),
  post: vi.fn(),
  ssoGet: vi.fn(),
  ssoPut: vi.fn(),
}));

vi.mock("~/store", () => ({
  default: {
    getters: { accessToken: "mock-access-token" },
  },
}));

vi.mock("~/helpers/url_helpers", () => ({
  default: {
    GET_SSO_PERSONAL_PROFILE: "mock-personal-profile-url",
    GET_SSO_BUSINESS_PROFILE: "mock-business-profile-url",
    CHANGE_PASSWORD: "mock-change-password-url",
    SET_TIMEZONE: "mock-set-timezone-url",
    DELETE_ACCOUNT: "mock-delete-account-url",
    STOREFRONT_STAT: "mock-storefront-stat-url",
    STOREFRONT_TRENDING_PRODUCT: "mock-storefront-trending-product-url",
  },
}));

describe("Setting Services Functions", () => {
  const mockAccessToken = "mock-access-token";

  beforeEach(() => {
    vi.clearAllMocks();
    store.getters.accessToken = mockAccessToken;
    get.mockResolvedValue({ data: "mock-response" });
    post.mockResolvedValue({ data: "mock-response" });
    ssoGet.mockResolvedValue({ data: "mock-response" });
    ssoPut.mockResolvedValue({ data: "mock-response" });
  });

  it("getProfile calls ssoGet correctly", async () => {
    await settingServices.getProfile();
    expect(ssoGet).toHaveBeenCalledWith("mock-personal-profile-url", {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
  });

  it("getCompanyProfile calls ssoGet correctly", async () => {
    await settingServices.getCompanyProfile();
    expect(ssoGet).toHaveBeenCalledWith("mock-business-profile-url", {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
  });

  it("updateProfile calls ssoPut correctly", async () => {
    const data = { some: "value" };
    await settingServices.updateProfile(data);
    expect(ssoPut).toHaveBeenCalledWith("mock-personal-profile-url", data, {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
  });

  it("changepassword calls post correctly", async () => {
    const data = { pass: "123" };
    const res = await settingServices.changepassword(data);
    expect(post).toHaveBeenCalledWith("mock-change-password-url", data, {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
    expect(res).toEqual({ data: "mock-response" });
  });

  it("settimezone calls post correctly", async () => {
    const data = { timezone: "UTC" };
    const res = await settingServices.settimezone(data);
    expect(post).toHaveBeenCalledWith("mock-set-timezone-url", data, {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
    expect(res).toEqual({ data: "mock-response" });
  });

  it("deleteaccount calls post correctly", async () => {
    const data = { confirm: true };
    const res = await settingServices.deleteaccount(data);
    expect(post).toHaveBeenCalledWith("mock-delete-account-url", data, {
      headers: { Authorization: `Bearer ${mockAccessToken}` },
    });
    expect(res).toEqual({ data: "mock-response" });
  });

  it("getesfrontstats calls get correctly", async () => {
    const params = { StartDate: "2023-01-01", EndDate: "2023-01-31" };
    const res = await settingServices.getesfrontstats(params);
    expect(get).toHaveBeenCalledWith(
      `mock-storefront-stat-url?StartDate=${params.StartDate}&EndDate=${params.EndDate}`,
      { headers: { Authorization: `Bearer ${mockAccessToken}` } }
    );
    expect(res).toEqual({ data: "mock-response" });
  });

  it("getstorefronttrending calls get correctly", async () => {
    const params = { StartDate: "2023-01-01", EndDate: "2023-01-31", top: 5 };
    const res = await settingServices.getstorefronttrending(params);
    expect(get).toHaveBeenCalledWith(
      `mock-storefront-trending-product-url?StartDate=${params.StartDate}&EndDate=${params.EndDate}&top=${params.top}`,
      { headers: { Authorization: `Bearer ${mockAccessToken}` } }
    );
    expect(res).toEqual({ data: "mock-response" });
  });
});