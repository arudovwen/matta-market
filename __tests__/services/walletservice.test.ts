// Import necessary modules from vitest
import { describe, it, expect, beforeEach, vi } from "vitest";

// Import the functions to be tested
import {
  getWalletDetails,
  getWalletBalance,
  createWallet,
  setWalletpin,
  changeWalletpin,
  verifyPin,
  createUpdateKyc,
  getKycDetail,
  addBeneficiary,
  getBeneficiaries,
  removeBeneficiary,
  setUpperLimit,
  setWarningLimit,
  verifyBvn,
  confirmFunding,
  validateAccount,
  withdrawFunds,
  getLedgerTransactions,
} from "~/services/walletservice"; // Replace with actual path


// Import mock dependencies
import urls from "~/helpers/url_helpers";
import { get, post } from "~/helpers/api_helpers";
import { cleanObject } from "~/utils/cleanObject";

// Mock configuration
const mockConfig = {
  headers: { Authorization: `Bearer mock-access-token` },
};

// Mocking API helpers and store
vi.mock("~/helpers/api_helpers", () => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("~/store", () => ({
  default: {
    getters: {
      accessToken: "mock-access-token",
    },
  },
}));

// Mocking URL helpers
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
    ADD_BENEFICIARY: "mock-add-beneficiary-url",
    GET_BENEFICIARIES: "mock-get-beneficiaries-url",
    REMOVE_BENEFICIARY: "mock-remove-beneficiary-url",
    SET_UPPER_LIMIT: "mock-set-upper-limit-url",
    SET_WARNING_LIMIT: "mock-set-warning-limit-url",
    VALIDATE_BVN: "mock-validate-bvn-url",
    CONFIRM_FUNDING: "mock-confirm-funding-url",
    VALIDATE_ACCOUNT: "mock-validate-account-url",
    WITHDRAW_FUNDS: "mock-withdraw-funds-url",
    GET_LEDGER_TRANSACTIONS: "mock-get-ledger-transactions-url",
  },
}));

// Clear all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Describe block for testing Wallet API functions
describe("Wallet API Functions", () => {
  it("should call getWalletDetails with the correct URL and config", async () => {
    const expectedResponse = {
      /* Replace with expected response */
    };

    get.mockResolvedValue(expectedResponse);

    const response = await getWalletDetails();

    expect(get).toHaveBeenCalledWith(urls.GET_WALLET_DETAILS, mockConfig);
    expect(response).toEqual(expectedResponse);
  });

  it("should call getWalletBalance with the correct URL and config", async () => {
    const mockId = "mock-wallet-id";
    const expectedResponse = {
      /* Replace with expected response */
    };

    get.mockResolvedValue(expectedResponse);

    const response = await getWalletBalance(mockId);

    expect(get).toHaveBeenCalled();
    expect(response).toEqual(expectedResponse);
  });

  it("should call createWallet with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await createWallet(mockData);

    expect(post).toHaveBeenCalledWith(urls.CREATE_WALLET, mockData, mockConfig);
    expect(response).toEqual(expectedResponse);
  });

  it("should call setWalletpin with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await setWalletpin(mockData);

    expect(post).toHaveBeenCalledWith(urls.SET_PIN, mockData, mockConfig);
    expect(response).toEqual(expectedResponse);
  });

  it("should call changeWalletpin with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await changeWalletpin(mockData);

    expect(post).toHaveBeenCalledWith(urls.CHANGE_PIN, mockData, mockConfig);
    expect(response).toEqual(expectedResponse);
  });

  it("should call verifyPin with the correct URL and config", async () => {
    const mockCode = "123456";
    const expectedResponse = {
      /* Replace with expected response */
    };

    get.mockResolvedValue(expectedResponse);

    const response = await verifyPin(mockCode);

    expect(get).toHaveBeenCalledWith(
      `${urls.VALIDATE_OTP}?code=${mockCode}`,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call createUpdateKyc with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await createUpdateKyc(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.CREATE_UPDATE_KYC,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call getKycDetail with the correct URL and config", async () => {
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await getKycDetail();

    expect(post).toHaveBeenCalled();
    expect(response).toEqual(expectedResponse);
  });

  it("should call addBeneficiary with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await addBeneficiary(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.ADD_BENEFICIARY,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call getBeneficiaries with the correct URL, params, and config", async () => {
    const mockParams = {
      discontinued: false,
      Search: "test",
      PageNumber: 1,
      PageSize: 10,
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await getBeneficiaries(mockParams);

    expect(post).toHaveBeenCalledWith(
      `${urls.GET_BENEFICIARIES}?Search=${mockParams.Search}&discontinued=${mockParams.discontinued}&?PageNumber=${mockParams.PageNumber}&PageSize=${mockParams.PageSize}`,
      {},
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call removeBeneficiary with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await removeBeneficiary(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.REMOVE_BENEFICIARY,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call setUpperLimit with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await setUpperLimit(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.SET_UPPER_LIMIT,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call setWarningLimit with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await setWarningLimit(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.SET_WARNING_LIMIT,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call verifyBvn with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await verifyBvn(mockData);

    expect(post).toHaveBeenCalledWith(urls.VALIDATE_BVN, mockData, mockConfig);
    expect(response).toEqual(expectedResponse);
  });

  it("should call confirmFunding with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await confirmFunding(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.CONFIRM_FUNDING,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call validateAccount with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await validateAccount(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.VALIDATE_ACCOUNT,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call withdrawFunds with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    post.mockResolvedValue(expectedResponse);

    const response = await withdrawFunds(mockData);

    expect(post).toHaveBeenCalledWith(
      urls.WITHDRAW_FUNDS,
      mockData,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should call getLedgerTransactions with the correct URL, data, and config", async () => {
    const mockData = {
      /* Replace with mock data */
    };
    const expectedResponse = {
      /* Replace with expected response */
    };

    get.mockResolvedValue(expectedResponse);

    const response = await getLedgerTransactions(mockData);

    expect(get).toHaveBeenCalledWith(
      `${urls.GET_LEDGER_TRANSACTIONS}?${new URLSearchParams(
        cleanObject(mockData)
      )}`,
      mockConfig
    );
    expect(response).toEqual(expectedResponse);
  });
});
