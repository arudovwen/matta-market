const urls = {
  //Auth urls
  LOGIN_USER: "v1/account/login",
  LOGIN_USER_2FA: "v1/account/login2fa",
  CONFIRM_2FA: "v1/account/confirm-2fa",
  REGISTER: "/v1/register",
  RESEND_VERIFICATION: "/v1/register/resendverification",
  REGISTER_INVITED_USER: "/v1/account/registerbusinessuser",
  FORGOT_PASSWORD: "v1/account/forgot-password",
  RESET_PASSWORD: "v1/account/reset-password",
  CONFIRM_EMAIL: "v1/account/confirm-email",
  SET_ACCOUNT_TYPE: "v1/onboarding/setaccounttype",
  SOCIAL_REGISTER: "v1/register/social",
  SOCIAL_LOGIN: "v1/account/sociallogin",
  RESEND_2FA_OTP: "v1/account/resend-2fa-code",

  //Onboarding
  COMPANY_UPDATE_PERSONAL_INFO: "/v1/Onboarding/company/update-PersonalInfo",
  COMPANY_UPDATE_ADDITIONAL_INFORMATION:
    "/v1/Onboarding/company/additonal-information",
  COMPANY_INVITE_USERS: "/v1/Onboarding/company/invite-users",
  GET_ONBOARDING_INFO: "v1/onboarding",
  SETTINGS: "/v1/settings",
  SETTINGS_SETTIMEZONE: "/v1/settings/settimezone",
  SETONBOARDING_COMPLETE: "v1/onboarding/setonboardingpageascomplete",

  //Product
  ADD_PRODUCT: "/v1/product/add-product",
  UPDATE_PRODUCT: "/v1/product/update-product",
  UPDATE_PRODUCT_PROPERTIES: "/v1/product/update-properties",
  UPDATE_PRODUCT_DOCUMENTS: "/v1/product/update-productdocuments",
  UPDATE_PRODUCT_ADDITIONAL: "/v1/product/update-additionalinfo",
  // GET_PRODUCTS: "/v1/marketplace/get-products",
  GET_PRODUCTS: "/v2/marketplace/products",
  GET_PRODUCT: "/v1/marketplace/get-product",
  SUPPLIER_GET_PRODUCTS: "/v1/product/get-products",
  SUPPLIER_GET_PRODUCT: "/v1/product/get-product",
  GET_PRODUCT_STATUS_COUNT: "/v1/product/get-productscount",
  DELETE_PRODUCT: "/v1/product/deleteproduct",
  GET_PRODUCTS_BY_TAG: "v1/marketplace/get-products-bytags",
  GET_STORE_INFO: "v2/marketplace/store",

  //Markets
  GET_MARKETS: "/v1/marketplace/getmarkets",
  GET_MARKET_MENU: "/v1/marketplace/getmarkets-menu",
  SEARCH_MARKET: "v1/marketplace/searchall",
  GET_MARKETS_LEVEL: "v1/marketplace/getmarketlevels",

  //Producer
  GET_PRODUCERS: "/v1/marketplace/get-producers",
  ADD_PRODUCER: "/v1/producer/addproducer",
  EDIT_PRODUCER: "/v1/producer/editproducer",

  //suppliers
  GET_SUPPLIERS: "/v1/suppliercatalog/getall",
  GET_SUPPLIER_DETAIL: "/v1/suppliercatalog/supplierdetails",
  GET_SUPPLIER_DOCUMENTS: "/v1/suppliercatalog/supplierdocuments",

  //Tech
  GET_TECH: "/v1/marketplace/gettech",
  GET_TECH_LEVEL: "/v1/technologies/gettechnologylevels",
  GET_TECH_MARKET: "/v1/technologies/techmarket",
  GET_TECH_MENU: "/v1/technologies/tech-menu",

  //Manuacturers
  GET_MANUFACTURERS: "/v1/marketplace/get-featured-manufacturers",

  //Upload
  UPLOAD_FILE: "/v1/fileservice/uploadsinglephoto",
  UPLOAD_DOCUMENT: "/v1/fileservice/uploadsingledocument",

  //settings
  GET_PROFILE: "v1/settings/getprofile",
  GET_COMPANY_PROFILE: "v1/settings/company/profile",
  UPDATE_PROFILE: "v1/settings/updateprofile",
  CHANGE_PASSWORD: "v1/settings/change-password",
  UPDATE_COMPANY_PROFILE: "v1/settings/company/update-profile",
  UPDATE_DOCUMENTS: "v1/settings/update-documents",
  UPDATE_DIRECTORS: "v1/settings/update-directors",
  SET_TIMEZONE: "v1/settings/settimezone",
  DELETE_ACCOUNT: "v1/settings/delete-account",
  STOREFRONT_STAT: "v1/storefront/stats",
  STOREFRONT_TRENDING_PRODUCT: "v1/storefront/trendingproducts",

  //Users
  INVITE_USERS: "v1/usermanagement/invite-users",
  RESEND_INVITE_USERS: "v1/usermanagement/resend-invite",
  GET_INVITES: "v1/usermanagement/get-invites",
  DELETE_INVITES: "v1/usermanagement/delete-invite",
  DELETE_USER: "v1/usermanagement/delete-user",
  CHANGE_ROLE: "v1/usermanagement/change-usersrole",
  GET_ROLES: "v1/usermanagement/get-roles",

  //Static values
  GET_COUNTRIES: "/v1/staticvalues/countries",

  //Cart
  CREATE_CART: "/v1/shoppingcart/create-cart",
  UPDATE_CART: "/v1/shoppingcart/update-cartitem",
  GET_CART: "/v1/shoppingcart/get-cart",
  GET_ORDER: "/v1/shoppingcart/get-order",
  GET_CUSTOMER_INFO: "/v1/shoppingcart/customer-info",
  REMOVE_CART: "/v1/shoppingcart/remove-cartitem",
  CLEAR_CART: "/v1/shoppingcart/clear-cart",
  CONFIRM_PURCHASE: "/v1/shoppingcart/confirm-purchase",
  CONFIRM_PAYMENT: "v1/ShoppingCart/confirm-payment",
  REQUEST_A_CALL: "/admin/v1/ShoppingCart/request-a-call",

  //Shipping address
  ADD_SHIPPING_ADDRESS: "/v1/shippingaddress/add",
  EDIT_SHIPPING_ADDRESS: "/v1/shippingaddress/edit",
  GET_SHIPPING_ADDRESS: "/v1/shippingaddress/getall",
  DEFAULT_SHIPPING_ADDRESS: "/v1/shippingaddress/setasdefault",
  DELETE_SHIPPING: "/v1/shippingaddress/delete",
  SHIPPONG_COST_BREAKDOWN: "/v1/ShoppingCart/shipping-cost-breakdown",
  PREPAID_CREDIT_INFO: "/v1/ShoppingCart/prepurchase-credit-info",

  ADD_PICKUP_ADDRESS: "/v1/pickuplocation/add",
  EDIT_PICKUP_ADDRESS: "/v1/pickuplocation/edit",
  GET_PICKUP_ADDRESS: "/v1/pickuplocation/get-pickuplocations",
  DELETE_PICKUP: "/v1/pickuplocation/delete",

  //Procurement
  PROCUREMENT_ORDERS: "v1/procurement/orders",
  PROCUREMENT_ORDER_DETAILS: "v1/procurement/orderdetails",
  PROCUREMENT_REQUEST_COUNT: "v1/procurement/requestcount",
  PROCUREMENT_MYREQUESTS: "v1/procurement/myrequests",
  PROCUREMENT_MYREQUEST_DETAILS: "v1/procurement/request-details",
  PROCUREMENT_PRODUCTS: "v1/procurement/products",
  PROCUREMENT_SUPPLIERS: "v1/procurement/suppliers",
  PROCUREMENT_SET_CANCELLED: "v1/procurement/setascancelled",

  //Storefront
  STOREFRONT_ORDERS: "v1/storefront/orders",
  STOREFRONT_ORDER_DETAILS: "v1/storefront/orderdetails",

  //SAMPLE requests
  ADD_SAMPLE_REQUEST: "v1/procurement/newsamplerequest",
  SAMPLE_REQUESTS: "v1/samplerequest/myrequests",
  SAMPLE_REQUESTS_COUNT: "v1/samplerequest/requestcount",
  SAMPLE_REQUESTS_PRODUCTS: "v1/samplerequest/products",
  SAMPLE_REQUEST_DETAILS: "v1/samplerequest/request-details",
  SAMPLE_REQUEST_UPLOAD_DOCUMENT: "v1/samplerequest/upload-document",

  //document requests
  ADD_DOCUMENT_REQUEST: "v1/buyerdocument/newsamplerequest",
  DOCUMENT_REQUESTS: "v1/buyerdocument/myrequests",
  DOCUMENT_REQUEST_DETAILS: "v1/buyerdocument/request-details",
  DOCUMENT_SET_CANCELLED: "v1/procurement/setascancelled",

  SELLER_DOCUMENTS: "v1/sellerdocument/myrequests",
  SELLER_DOCUMENT_DETAILS: "v1/sellerdocument/request-details",
  SELLER_DOCUMENT_SET_CANCELLED: "v1/procurement/setascancelled",
  BUYER_ORDER_TIMELINE: "v1/procurement/ordertimeline",

  //notifcations
  GET_NOTIFICATION: "v1/notification",
  // GET_NOTIFICATION_SETTINGS: "v1/notification/getsettings",
  // UPDATE_NOTIFICATION_SETTINGS: "v1/notification/updatesettings",
  MARK_NOTIFICATION: "v1/notification/markasviewed",
  MARK_ALL_NOTIFICATION: "v1/notification/markallasviewed",

  //favourites
  LIKE_PRODUCT: "v1/likes/likeproduct",
  UNLIKE_PRODUCT: "v1/likes/unlikeproduct",
  GET_LIKED_PRODUCT: "v1/likes/likedproducts",

  LIKE_SUPPLIER: "v1/likes/likesupplier",
  UNLIKE_SUPPLIER: "v1/likes/unlikesupplier",
  GET_LIKED_SUPPLIERS: "v1/likes/likedsuppliers",

  //Quotes
  NEW_QUOTE: "v1/quotes/new",
  SELLER_QUOTES: "v1/quotes/seller",
  SELLER_QUOTE_DETAIL: "v1/quotes/seller/details",
  BUYER_QUOTES: "v1/quotes/buyer",
  BUYER_QUOTE_DETAIL: "v1/quotes/buyer/details",
  QUOTE_UPLOAD_DOCUMENT: "v1/quotes/upload-document",

  //Charts
  ORDER_TREND: "v1/storefront/ordertrendchart",
  CHART_TREND: "v1/storefront/charttrend",

  //wallet
  CREATE_WALLET: "v1/wallet/new",
  CHECK_BALANCE: "v1/wallet/get-balance",
  GET_WALLET_DETAILS: "v1/wallet/customer-wallet-details",
  SET_PIN: "v1/wallet/set-transfer-pin",
  CHANGE_PIN: "v1/wallet/change-pin",
  VALIDATE_OTP: "v1/wallet/validate-otp",
  SET_WARNING_LIMIT: "v1/wallet/setwarninglimit",
  SET_UPPER_LIMIT: "v1/wallet/setupperlimit",
  VALIDATE_ACCOUNT: "v1/wallet/validate-account",
  VALIDATE_BVN: "v1/wallet/verify-bvn",
  CONFIRM_FUNDING: "v1/wallet/confirm-wallet-funding",
  WITHDRAW_FUNDS: "v1/wallet/withdraw",
  GET_WITHDRAW_CHARGE: "v1/wallet/get-withdrawalfee",
  GET_DEPOSIT_CHARGE: "v1/wallet/get-depositfee",
  WALLET_REPAYMENT: "v1/Financing/finanncing/wallet-repay",

  //beneficiaries
  ADD_BENEFICIARY: "v1/beneficiaryaccount/add",
  GET_BENEFICIARIES: "v1/beneficiaryaccount/get-all",
  REMOVE_BENEFICIARY: "v1/beneficiaryaccount/discontinue",

  // Kyc
  CREATE_UPDATE_KYC: "v1/kyc/createupdate",
  GET_KYC_DETAIL: "v1/kyc/get",

  // product request
  CREATE_PRODUCT_REQUEST: "v1/productrequest/new",
  GET_ALL_PRODUCT_REQUEST: "v1/productrequest/get-all",

  // Contact
  CONTACT_USER: "v1/contact/send",

  CUSTOMIZE_VENDOR_INFO: "v1/customize/vendor",
  GET_VENDOR_STORE: "v1/storefront/get-store",
  UPDATE_VENDOR_STORE: "v1/storefront/update-store",
  POST_VENDOR_STORE_NAME: "v1/storefront/search-name",

  //Finance
  GET_ALL_FINANCE: "v1/financing/get-all",
  ADD_FINANCE: "v1/financing/add",
  EDIT_FINANCE: "v1/financing/edit",
  UPDATE_APPROVE_FINANCE: "v1/financing/financing/update-approval",
  GET_FINANCE: "v1/financing/get",
  WITHDRAW_FINANCE: "v1/financing/withdraw",

  //Settlements

  ADD_SETTLEMENT: "v1/settlement/add-settlement-account",
  AUTO_SETTLEMENT: "v1/settlement/autosettlement",
  AUTO_SETTLEMENT_VALUE: "v1/settlement/autosettlement-value",
  VIEW_SETTLEMENT: "v1/settlement/view-settlement-account",
  UPDATE_SETTLEMENT: "v1/settlement/update-settlement-account",
  DELETE_SETTLEMENT: "v1/settlement/delete-settlement-account",
  GET_BANKS: "v1/bank/get-bank",
  GET_LEDGER_TRANSACTIONS: "v1/ledger/get-all",

  ADDRESS_SEARCH: "Location/address-search",
  PLACE_SUGGESTION: "Location/place-suggestion",

  APPLY_DISCOUNT: "v1/discount/apply-discount",

  // Credit
  REQUEST_CREDIT: "v1/CreditRequest/new",
  GET_ALL_CREDIT_REQUEST: "v1/CreditRequest/get-all",
  GET_CREDIT_DETAIL: "v1/CreditRequest/wallet",

  //DELTALOG
  CALCULATOR_COST: "/Anonymous/shipping-cost",
  GET_ENQUIRY: "/Anonymous/enquiry"
};
export default urls;
