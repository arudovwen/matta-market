import urls from "../helpers/url_helpers";
import { get, post, walletGet, walletPost } from "../helpers/api_helpers";
import store from "../store";
// import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getWalletDetails = () => {
  return walletGet(`${urls.GET_WALLET_DETAILS}`, config);
};
export const getWalletBalance = () => {
  return walletGet(`${urls.CHECK_BALANCE}`, config);
};

export const createWallet = (data) => {
  return walletPost(`${urls.CREATE_WALLET}`, data, config);
};

export const setWalletpin = (data) => {
  return walletPost(`${urls.SET_PIN}`, data, config);
};
export const walletRepayment = (data) => {
  return walletPost(`${urls.WALLET_REPAYMENT}`, data, config);
};
export const changeWalletpin = (data) => {
  return walletPost(`${urls.CHANGE_PIN}`, data, config);
};

export const verifyPin = (data) => {
  return walletGet(`${urls.VALIDATE_OTP}?code=${data}`, config);
};

export const createUpdateKyc = (data) => {
  return walletPost(`${urls.CREATE_UPDATE_KYC}`, data, config);
};

export const getKycDetail = () => {
  return walletPost(`${urls.GET_KYC_DETAIL}`, {}.config);
};

export const addBeneficiary = (data) => {
  return walletPost(`${urls.ADD_BENEFICIARY}`, data, config);
};

export const getBeneficiaries = ({
  discontinued,
  Search,
  PageNumber,
  PageSize,
}) => {
  return walletPost(
    `${urls.GET_BENEFICIARIES}?Search=${Search}&discontinued=${discontinued}&?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    {},
    config
  );
};
export const removeBeneficiary = (data) => {
  return walletPost(`${urls.REMOVE_BENEFICIARY}`, data, config);
};
export const setUpperLimit = (data) => {
  return walletPost(`${urls.SET_UPPER_LIMIT}`, data, config);
};
export const setWarningLimit = (data) => {
  return walletPost(`${urls.SET_WARNING_LIMIT}`, data, config);
};

export const verifyBvn = (data) => {
  return walletPost(`${urls.VALIDATE_BVN}`, data, config);
};
export const confirmFunding = (data) => {
  return walletPost(`${urls.CONFIRM_FUNDING}`, data, config);
};
export const validateAccount = (data) => {
  return walletPost(`${urls.VALIDATE_ACCOUNT}`, data, config);
};
export const withdrawFunds = (data) => {
  return walletPost(`${urls.WITHDRAW_FUNDS}`, data, config);
};

export const getLedgerTransactions = (data) => {
  return walletGet(
    `${urls.GET_LEDGER_TRANSACTIONS}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
};

export const getWithdrawalCharge = (data) => {
  return walletGet(`${urls.GET_WITHDRAW_CHARGE}/${data}?amount=${data}`, config);
};
export const getDepositCharge = (data) => {
  return walletGet(`${urls.GET_DEPOSIT_CHARGE}/${data}?amount=${data}`, config);
};
