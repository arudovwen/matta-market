import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";
import store from "../store";
import { cleanObject } from "~/utils/cleanObject";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function addProduct(data) {
  return await post(urls.ADD_PRODUCT, data, config);
}
export async function updateProduct(data) {
  return await post(urls.UPDATE_PRODUCT, data, config);
}
export async function updateProperties(data) {
  return await post(urls.UPDATE_PRODUCT_PROPERTIES, data, config);
}
export async function updateDocuments(data) {
  return await post(urls.UPDATE_PRODUCT_DOCUMENTS, data, config);
}
export async function updateAdditional(data) {
  return await post(urls.UPDATE_PRODUCT_ADDITIONAL, data, config);
}
export async function deleteProduct(id) {
  return await post(`${urls.DELETE_PRODUCT}/${id}`, {}, config);
}
//Markets
export async function getMarkets({ PageNumber = 1, PageSize = 10 }) {
  return await get(
    `${urls.GET_MARKETS}?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function getProductsByTag(payload) {
  return await post(`${urls.GET_PRODUCTS_BY_TAG}`, payload, config);
}

export async function getMarketmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  MarketId = "",
}) {
  return await get(
    `${urls.GET_MARKET_MENU}?ShowSubMenu=${ShowSubMenu}&PageNumber=${PageNumber}&PageSize=${PageSize}&MarketId=${MarketId}`,
    config
  );
}

//mANUFACTURER
export async function getFeaturedManufacturer({
  Search = "",
  PageNumber = 1,
  PageSize = 10,
}) {
  return await get(
    `${urls.GET_MANUFACTURERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

//TECH
export async function getTech({ Search = "", PageNumber = 1, PageSize = 10 }) {
  return await get(
    `${urls.GET_TECH}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getTechLevels() {
  return await get(`${urls.GET_TECH_LEVEL}`, config);
}
export async function getTechmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  TechnologyId = "",
}) {
  return await get(
    `${urls.GET_TECH_MENU}?ShowSubMenu=${ShowSubMenu}&PageNumber=${PageNumber}&PageSize=${PageSize}&TechnologyId=${TechnologyId}`,
    config
  );
}

//products
export async function getProduct(productId) {
  return await get(`${urls.GET_PRODUCT}?productId=${productId}`, config);
}
export async function getProducts(payload) {
  return await post(`${urls.GET_PRODUCTS}`, cleanObject(payload), config);
}
export async function getSupplierProduct({ productId }) {
  return await get(
    `${urls.SUPPLIER_GET_PRODUCT}?productId=${productId}`,
    config
  );
}
export async function getSupplierProducts({
  Producer = "",
  PageNumber = 1,
  PageSize = 10,
  MarketId = "",
  Search = "",
  Status = "",
  SortOrder = "",
  MarketApplication = "",
}) {
  return await get(
    `${urls.SUPPLIER_GET_PRODUCTS}?Producer=${Producer}&SortOrder=${SortOrder}&MarketId=${MarketId}&PageNumber=${PageNumber}&PageSize=${PageSize}&Search=${Search}&Status=${Status}&MarketApplication=${MarketApplication}`,
    config
  );
}

export async function getProducers({
  Search = "",
  PageNumber = 1,
  PageSize = 10,
}) {
  return await get(
    `${urls.GET_PRODUCERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function searchmarket({
  PageNumber = 1,
  PageSize = 10,
  search = "",
}) {
  return await get(
    `${urls.SEARCH_MARKET}?search=${search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function getsuppliers({
  PageNumber = 1,
  PageSize = 10,
  search = "",
  Producer = "",
}) {
  return await get(
    `${urls.GET_SUPPLIERS}?search=${search}&Producer=${Producer}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getsupplier({ supplierId = "" }) {
  return await get(
    `${urls.GET_SUPPLIER_DETAIL}?supplierId=${supplierId}`,
    config
  );
}
export async function getsupplierdocuments({ supplierId = "" }) {
  return await get(
    `${urls.GET_SUPPLIER_DOCUMENTS}?supplierId=${supplierId}`,
    config
  );
}

export async function getproductcount() {
  return await get(`${urls.GET_PRODUCT_STATUS_COUNT}`, config);
}

export async function getmarketlevels() {
  return await get(`${urls.GET_MARKETS_LEVEL}`, config);
}

export async function gettechlevels() {
  return await get(`${urls.GET_TECH_LEVEL}`, config);
}
export async function getStoreInfo(data) {
  return await get(`${urls.GET_STORE_INFO}?slug=${data}`, config);
}
export async function likeproduct(data) {
  return await post(`${urls.LIKE_PRODUCT}`, data, config);
}
export async function unlikeproduct(data) {
  return await post(`${urls.UNLIKE_PRODUCT}`, data, config);
}
export async function getlikeproducts({
  PageNumber = 1,
  PageSize = 10,
  Search = "",
  SortOrder,
  Manufacturer,
}) {
  return await get(
    `${urls.GET_LIKED_PRODUCT}?Search=${Search}&PageNumber=${PageNumber}&SortOrder=${SortOrder}&PageSize=${PageSize}&Manufacturer=${Manufacturer}`,
    config
  );
}

export async function likesupplier(data) {
  return await post(`${urls.LIKE_SUPPLIER}`, data, config);
}
export async function unlikesupplier(data) {
  return await post(`${urls.UNLIKE_SUPPLIER}`, data, config);
}
export async function getlikedsuppliers({
  PageNumber = 1,
  PageSize = 10,
  Search = "",
  SortOrder,
}) {
  return await get(
    `${urls.GET_LIKED_SUPPLIERS}?Search=${Search}&PageNumber=${PageNumber}&SortOrder=${SortOrder}&PageSize=${PageSize}`,
    config
  );
}

export async function addproducer(data) {
  return await post(`${urls.ADD_PRODUCER}`, data, config);
}
export async function editproducer(data) {
  return await post(`${urls.EDIT_PRODUCER}`, data, config);
}

export async function getproductrequests({ PageNumber, PageSize }) {
  return await get(
    `${urls.GET_ALL_PRODUCT_REQUEST}?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function createproductrequest(data) {
  return await post(`${urls.CREATE_PRODUCT_REQUEST}`, data, config);
}
