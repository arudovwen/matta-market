import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getWalletDetails,
  getWalletBalance,
  createWallet,
  setWalletpin,
  changeWalletpin,
  verifyPin,
  createUpdateKyc,
  getKycDetail,
  getLedgerTransactions,
} from "~/services/walletservice";

import urls from "~/helpers/url_helpers";
import { walletGet, walletPost } from "~/helpers/api_helpers";
import { cleanObject } from "~/utils/cleanObject";

vi.mock("~/helpers/api_helpers", () => ({
  walletGet: vi.fn(),
  walletPost: vi.fn(),
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
    GET_WALLET_DETAILS: "mock-get-wallet-details-url",
    CHECK_BALANCE: "mock-check-balance-url",
    CREATE_WALLET: "mock-create-wallet-url",
    SET_PIN: "mock-set-pin-url",
    CHANGE_PIN: "mock-change-pin-url",
    VALIDATE_OTP: "mock-validate-otp-url",
    CREATE_UPDATE_KYC: "mock-create-update-kyc-url",
    GET_KYC_DETAIL: "mock-get-kyc-detail-url",
    GET_LEDGER_TRANSACTIONS: "mock-get-ledger-transactions-url",
  },
}));

const mockConfig = {
  headers: { Authorization: `Bearer mock-access-token` },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Wallet API Functions", () => {
  it("getWalletDetails", async () => {
    walletGet.mockResolvedValue({ data: "ok" });

    const res = await getWalletDetails();

    expect(walletGet).toHaveBeenCalledWith(
      urls.GET_WALLET_DETAILS,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("getWalletBalance", async () => {
    walletGet.mockResolvedValue({ data: "ok" });

    await getWalletBalance("123");

    expect(walletGet).toHaveBeenCalled();
  });

  it("createWallet", async () => {
    walletPost.mockResolvedValue({ data: "ok" });

    const data = { name: "wallet" };

    const res = await createWallet(data);

    expect(walletPost).toHaveBeenCalledWith(
      urls.CREATE_WALLET,
      data,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("setWalletpin", async () => {
    walletPost.mockResolvedValue({ data: "ok" });

    const data = { pin: "1234" };

    const res = await setWalletpin(data);

    expect(walletPost).toHaveBeenCalledWith(
      urls.SET_PIN,
      data,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("changeWalletpin", async () => {
    walletPost.mockResolvedValue({ data: "ok" });

    const data = { pin: "5678" };

    const res = await changeWalletpin(data);

    expect(walletPost).toHaveBeenCalledWith(
      urls.CHANGE_PIN,
      data,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("verifyPin", async () => {
    walletGet.mockResolvedValue({ data: "ok" });

    const res = await verifyPin("123456");

    expect(walletGet).toHaveBeenCalledWith(
      `${urls.VALIDATE_OTP}?code=123456`,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("createUpdateKyc", async () => {
    walletPost.mockResolvedValue({ data: "ok" });

    const data = { level: 2 };

    const res = await createUpdateKyc(data);

    expect(walletPost).toHaveBeenCalledWith(
      urls.CREATE_UPDATE_KYC,
      data,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });

  it("getKycDetail", async () => {
    walletPost.mockResolvedValue({ data: "ok" });

    const res = await getKycDetail();

    expect(walletPost).toHaveBeenCalled();
    expect(res).toEqual({ data: "ok" });
  });

  it("getLedgerTransactions", async () => {
    walletGet.mockResolvedValue({ data: "ok" });

    const params = { page: 1 };

    const res = await getLedgerTransactions(params);

    expect(walletGet).toHaveBeenCalledWith(
      `${urls.GET_LEDGER_TRANSACTIONS}?${new URLSearchParams(
        cleanObject(params)
      )}`,
      mockConfig
    );
    expect(res).toEqual({ data: "ok" });
  });
});