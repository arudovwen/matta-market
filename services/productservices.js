import urls from "../helpers/url_helpers";
import { post, get, marketPost, marketGet } from "../helpers/api_helpers";
import store from "../store";
import { cleanObject } from "~/utils/cleanObject";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function addProduct(data) {
  return await marketPost(urls.ADD_PRODUCT, data, config);
}
export async function updateProduct(data) {
  return await marketPost(urls.UPDATE_PRODUCT, data, config);
}
export async function updateProperties(data) {
  return await marketPost(urls.UPDATE_PRODUCT_PROPERTIES, data, config);
}
export async function updateDocuments(data) {
  return await marketPost(urls.UPDATE_PRODUCT_DOCUMENTS, data, config);
}
export async function updateAdditional(data) {
  return await marketPost(urls.UPDATE_PRODUCT_ADDITIONAL, data, config);
}
export async function deleteProduct(id) {
  return await marketPost(`${urls.DELETE_PRODUCT}/${id}`, {}, config);
}
//Markets
export async function getMarkets({ PageNumber = 1, PageSize = 10 }) {
  return await marketGet(
    `${urls.GET_MARKETS}?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function getProductsByTag(payload) {
  return await marketPost(
    `${urls.GET_PRODUCTS_BY_TAG}`,
    { ...payload, withZoho: true },
    config
  );
}

export async function getMarketmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  MarketId = "",
}) {
  return await marketGet(
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
  return await marketGet(
    `${urls.GET_MANUFACTURERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

//TECH
export async function getTech({ Search = "", PageNumber = 1, PageSize = 10 }) {
  return await marketGet(
    `${urls.GET_TECH}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getTechLevels() {
  return await marketGet(`${urls.GET_TECH_LEVEL}`, config);
}
export async function getTechmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  TechnologyId = "",
}) {
  return await marketGet(
    `${urls.GET_TECH_MENU}?ShowSubMenu=${ShowSubMenu}&PageNumber=${PageNumber}&PageSize=${PageSize}&TechnologyId=${TechnologyId}`,
    config
  );
}

//products
export async function getProduct(productId) {
  return await marketGet(`${urls.GET_PRODUCT}?productId=${productId}`, config);
}
export async function getProducts(payload) {
  return await marketPost(
    `${urls.GET_PRODUCTS}`,
    cleanObject({
      ...payload,
      withZoho: payload.withZoho !== undefined ? payload.withZoho : true,
    }),
    config
  );
}
export async function getSupplierProduct({ productId }) {
  return await marketGet(
    `${urls.SUPPLIER_GET_PRODUCT}?productId=${productId}`,
    config
  );
}

export async function getSupplierProducts(payload) {
  return await marketGet(
    `${urls.SUPPLIER_GET_PRODUCTS}?${new URLSearchParams(
      cleanObject({
        ...payload,
        withZoho: payload.withZoho !== undefined ? payload.withZoho : true,
      })
    )}`,
    config
  );
}

export async function getProducers({
  Search = "",
  PageNumber = 1,
  PageSize = 10,
}) {
  return await marketGet(
    `${urls.GET_PRODUCERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function searchmarket({
  PageNumber = 1,
  PageSize = 10,
  search = "",
}) {
  return await marketGet(
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
  return await marketGet(
    `${urls.GET_SUPPLIERS}?search=${search}&Producer=${Producer}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getsupplier({ supplierId = "" }) {
  return await marketGet(
    `${urls.GET_SUPPLIER_DETAIL}?supplierId=${supplierId}`,
    config
  );
}
export async function getsupplierdocuments({ supplierId = "" }) {
  return await marketGet(
    `${urls.GET_SUPPLIER_DOCUMENTS}?supplierId=${supplierId}`,
    config
  );
}

export async function getproductcount() {
  return await marketGet(`${urls.GET_PRODUCT_STATUS_COUNT}`, config);
}

export async function getmarketlevels() {
  return await marketGet(`${urls.GET_MARKETS_LEVEL}`, config);
}

// export async function gettechlevels() {
//   return await get(`${urls.GET_TECH_LEVEL}`, config);
// }
export async function getStoreInfo(data) {
  return await marketGet(`${urls.GET_STORE_INFO}?slug=${data}`, config);
}
export async function likeproduct(data) {
  return await marketPost(`${urls.LIKE_PRODUCT}`, data, config);
}
export async function unlikeproduct(data) {
  return await marketPost(`${urls.UNLIKE_PRODUCT}`, data, config);
}
export async function getlikeproducts(payload) {
  return await marketGet(
    `${urls.GET_LIKED_PRODUCT}?${new URLSearchParams(cleanObject(payload))}`,
    config
  );
}

export async function likesupplier(data) {
  return await post(`${urls.LIKE_SUPPLIER}`, data, config);
}
export async function unlikesupplier(data) {
  return await post(`${urls.UNLIKE_SUPPLIER}`, data, config);
}
export async function getlikedsuppliers(payload) {
  return await get(
    `${urls.GET_LIKED_SUPPLIERS}?${new URLSearchParams(cleanObject(payload))}`,
    config
  );
}

export async function addproducer(data) {
  return await marketPost(`${urls.ADD_PRODUCER}`, data, config);
}
export async function editproducer(data) {
  return await marketPost(`${urls.EDIT_PRODUCER}`, data, config);
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
