/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid

export function payWithMonnify(
  data,
  onModalClose,
  onSuccess,
) {
  const config = useRuntimeConfig();

  // Store the latest callbacks globally to prevent Monnify SDK from caching old closures
  window._latestMonnifyOnSuccess = onSuccess;
  window._latestMonnifyOnClose = onModalClose;

  window.MonnifySDK.initialize({
    amount: data.amount,
    currency: "NGN",
    reference: data.reference || "" + Math.floor(Math.random() * 1000000000 + 1),
    customerName: data.name,
    customerEmail: data.email,
    apiKey: config.public.APP_MONNIFYAPIKEY,
    contractCode: config.public.APP_MONNIFYCONTRACTCODE,

    paymentDescription: data.type || "Order payment",
    isTestMode: config.public.APP_MONNIFYISTESTMODE,
    metadata: {},
    paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD", "PHONE_NUMBER"],
    incomeSplitConfig: [],
    onComplete: function (response) {
      // Implement what happens when transaction is completed.
      if (window._latestMonnifyOnSuccess) {
        window._latestMonnifyOnSuccess(response);
      }
    },
    onClose: function (data) {
      if (data.responseCode === "USER_CANCELLED" || data.status === "FAILED") {
        if (window._latestMonnifyOnClose) {
          window._latestMonnifyOnClose();
        }
      }
      // Implement what should happen when the modal is closed here
    },
  });
}
