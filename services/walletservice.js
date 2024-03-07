import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";
import store from "../store";
// import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getWalletDetails = () => {
  return get(`${urls.GET_WALLET_DETAILS}`, config);
};
export const getWalletBalance = () => {
  return get(`${urls.CHECK_BALANCE}`, config);
};

export const createWallet = (data) => {
  return post(`${urls.CREATE_WALLET}`, data, config);
};

export const setWalletpin = (data) => {
  return post(`${urls.SET_PIN}`, data, config);
};
export const changeWalletpin = (data) => {
  return post(`${urls.CHANGE_PIN}`, data, config);
};

export const verifyPin = (data) => {
  return get(`${urls.VALIDATE_OTP}?code=${data}`, config);
};

export const createUpdateKyc = (data) => {
  return post(`${urls.CREATE_UPDATE_KYC}`, data, config);
};

export const getKycDetail = () => {
  return post(`${urls.GET_KYC_DETAIL}`, {}.config);
};

export const addBeneficiary = (data) => {
  return post(`${urls.ADD_BENEFICIARY}`, data, config);
};

export const getBeneficiaries = ({
  discontinued,
  Search,
  PageNumber,
  PageSize,
}) => {
  return post(
    `${urls.GET_BENEFICIARIES}?Search=${Search}&discontinued=${discontinued}&?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    {},
    config
  );
};
export const removeBeneficiary = (data) => {
  return post(`${urls.REMOVE_BENEFICIARY}`, data, config);
};
export const setUpperLimit = (data) => {
  return post(`${urls.SET_UPPER_LIMIT}`, data, config);
};
export const setWarningLimit = (data) => {
  return post(`${urls.SET_WARNING_LIMIT}`, data, config);
};

export const verifyBvn = (data) => {
  return post(`${urls.VALIDATE_BVN}`, data, config);
};
export const confirmFunding = (data) => {
  return post(`${urls.CONFIRM_FUNDING}`, data, config);
};
export const validateAccount = (data) => {
  return post(`${urls.VALIDATE_ACCOUNT}`, data, config);
};

export const getLedgerTransactions = (data) => {
  return get(`${urls.GET_LEDGER_TRANSACTIONS}?${new URLSearchParams(cleanObject(data))}`, config);
};
