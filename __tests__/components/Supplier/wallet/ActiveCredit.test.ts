import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { reactive } from "vue";
import ActiveCredit from "@/components/Supplier/wallet/ActiveCredit.vue";
import * as walletService from "~/services/walletservice";
import * as creditService from "~/services/creditservice";

vi.mock("~/services/walletservice", () => ({
  getWalletDetails: vi.fn(),
}));

vi.mock("~/services/creditservice", () => ({
  getCreditDetail: vi.fn(),
}));

const mockAuthStore = reactive({
  userInfo: {
    firstName: "John",
    lastName: "Doe",
  },
});

vi.stubGlobal("useAuthStore", () => mockAuthStore);
vi.stubGlobal("useRoute", () => ({ query: {} }));
vi.stubGlobal("navigateTo", vi.fn());

describe("Credit Component", () => {
  let wrapper;
  const currencyFormat = (val) => `₦${val?.toLocaleString() || 0}`;

  const createComponent = () => {
    return mount(ActiveCredit, {
      global: {
        config: {
          globalProperties: {
            currencyFormat,
          },
        },
        stubs: {
          AppIcon: { template: '<div class="app-icon-stub"></div>' },
          SupplierWalletCreditTransactions: { 
            template: '<div class="transactions-stub"></div>' 
          },
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    walletService.getWalletDetails.mockResolvedValue({ data: { data: [] } });
    creditService.getCreditDetail.mockResolvedValue({ data: { data: {} } });
  });

  it("handles wallet and credit service failure", async () => {
    walletService.getWalletDetails.mockRejectedValue(new Error("Failed"));
    creditService.getCreditDetail.mockRejectedValue(new Error("Failed"));

    wrapper = createComponent();
    await flushPromises();

    expect(wrapper.vm.hasWallet).toBe(false);
    expect(wrapper.vm.hasCredit).toBe(false);
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("applies background image style", async () => {
    wrapper = createComponent();
    await flushPromises();
    
    const card = wrapper.find('[style*="background-image"]');
    expect(card.exists()).toBe(true);
    expect(card.attributes("style")).toMatch(/lines\.png/);
  });

  it("fetches wallet details on mount", async () => {
    const mockWalletData = [
      { id: 1, amount: 100, date: "2024-01-01" },
      { id: 2, amount: 200, date: "2024-01-02" },
    ];

    walletService.getWalletDetails.mockResolvedValue({ 
      data: { data: mockWalletData } 
    });

    wrapper = createComponent();
    await flushPromises();

    expect(walletService.getWalletDetails).toHaveBeenCalled();
    expect(wrapper.vm.details).toEqual(mockWalletData);
    expect(wrapper.vm.hasWallet).toBe(true);
  });

  it("updates details reactive ref on successful wallet fetch", async () => {
    const mockData = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];
    walletService.getWalletDetails.mockResolvedValue({ data: { data: mockData } });
    
    wrapper = createComponent();
    await flushPromises();
    
    expect(wrapper.vm.details).toEqual(mockData);
    expect(wrapper.vm.hasWallet).toBe(true);
  });

  it("initializes with loading state", async () => {
    wrapper = createComponent();
    
    expect(wrapper.vm.isLoading).toBeDefined();
  });

  it("handles empty wallet response", async () => {
    walletService.getWalletDetails.mockResolvedValue({ 
      data: { data: [] } 
    });

    wrapper = createComponent();
    await flushPromises();

    expect(wrapper.vm.details).toEqual([]);
    expect(wrapper.vm.hasWallet).toBe(true);
  });

  it("handles empty credit response", async () => {
    creditService.getCreditDetail.mockResolvedValue({ 
      data: { data: {} } 
    });

    wrapper = createComponent();
    await flushPromises();

    expect(wrapper.vm.hasCredit).toBe(true);
  });

  it("continues to work when both services fail", async () => {
    walletService.getWalletDetails.mockRejectedValue(
      new Error("Wallet service failed")
    );
    creditService.getCreditDetail.mockRejectedValue(
      new Error("Credit service failed")
    );

    wrapper = createComponent();
    await flushPromises();

    expect(wrapper.vm.hasWallet).toBe(false);
    expect(wrapper.vm.hasCredit).toBe(false);
  });
});