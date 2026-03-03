import { describe, it, expect, vi, beforeEach } from "vitest";
import * as productServices from "@/services/productservices";
import urls from "@/helpers/urls";

vi.mock("~/helpers/api_helpers", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    marketPost: vi.fn().mockResolvedValue({ success: true }),
    marketGet: vi.fn().mockResolvedValue({ data: [] }),
  };
});

describe("Product Helper Functions", () => {
  const dummyData = { name: "Test Product" };
  const dummyId = "123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("addProduct", async () => {
    const res = await productServices.addProduct(dummyData);
    expect(res).toEqual({ success: true });
  });

  it("updateProduct", async () => {
    const res = await productServices.updateProduct(dummyData);
    expect(res).toEqual({ success: true });
  });

  it("updateProperties", async () => {
    const res = await productServices.updateProperties(dummyData);
    expect(res).toEqual({ success: true });
  });

  it("updateDocuments", async () => {
    const res = await productServices.updateDocuments(dummyData);
    expect(res).toEqual({ success: true });
  });

  it("updateAdditional", async () => {
    const res = await productServices.updateAdditional(dummyData);
    expect(res).toEqual({ success: true });
  });

  it("deleteProduct", async () => {
    const res = await productServices.deleteProduct(dummyId);
    expect(res).toEqual({ success: true });
  });

  it("getMarkets", async () => {
    const res = await productServices.getMarkets({ PageNumber: 1, PageSize: 10 });
    expect(res).toEqual({ data: [] });
  });

  it("getMarketmenu", async () => {
    const res = await productServices.getMarketmenu({ ShowSubMenu: true, PageNumber: 1, PageSize: 10 });
    expect(res).toEqual({ data: [] });
  });

  it("getFeaturedManufacturer", async () => {
    const res = await productServices.getFeaturedManufacturer({ PageNumber: 1, PageSize: 10, Search: "" });
    expect(res).toEqual({ data: [] });
  });

  it("getTech", async () => {
    const res = await productServices.getTech({ Search: "", PageNumber: 1, PageSize: 10 });
    expect(res).toEqual({ data: [] });
  });

  it("getTechLevels", async () => {
    const res = await productServices.getTechLevels();
    expect(res).toEqual({ data: [] });
  });

  it("getTechmenu", async () => {
    const res = await productServices.getTechmenu({ ShowSubMenu: true, PageNumber: 1, PageSize: 10 });
    expect(res).toEqual({ data: [] });
  });

  it("getProduct", async () => {
    const res = await productServices.getProduct(dummyId);
    expect(res).toEqual({ data: [] });
  });

  it("getSupplierProduct", async () => {
    const res = await productServices.getSupplierProduct({ productId: dummyId });
    expect(res).toEqual({ data: [] });
  });
});