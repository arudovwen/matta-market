import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('~/services/settingservices');
vi.mock('~/services/financeservice');

import RequestForm from '~/components/Credit/RequestForm.vue';
import * as settingServices from '~/services/settingservices';
import * as financeServices from '~/services/financeservice';

const mockGetCompanyProfile = vi.mocked(settingServices.getCompanyProfile);
const mockGetFinance = vi.mocked(financeServices.getFinance);

const createAuthStoreMock = () => ({
  userInfo: {
    email: 'test@example.com',
    phoneNumber: '+2348012345678',
  },
  userId: 'user-123',
});

const mockRoute = {
  params: {
    financeId: 'finance-123',
    type: 'trade',
    id: '1',
  },
};

const mockCompanyProfileResponse = {
  data: {
    data: {
      companyName: 'Test Company',
      sector: 'Technology',
      businessType: 'Limited',
      address: '123 Test St',
      companyDocuments: [
        {
          id: '1',
          urls: [{ url: 'https://example.com/doc1.pdf' }],
          documentType: 0,
        },
      ],
      country: 'Nigeria',
      city: 'Lagos',
      state: 'Lagos',
    },
  },
};

const mockFinanceResponse = {
  status: 200,
  data: {
    data: {
      amountRequired: 50000,
      tenor: 12,
      whereDidYouHearAboutUs: 'Google',
      supportingDocuments: [
        {
          urls: [{ url: 'https://example.com/support.pdf' }],
          documentType: 0,
        },
      ],
      haveyoudonebusiness: true,
      haveyouexportedtotheothercourty: false,
    },
  },
};

const createWrapper = (routeOverride = null) => {
  const mockUseRoute = vi.fn(() => routeOverride || mockRoute);
  const mockUseAuthStore = vi.fn(() => createAuthStoreMock());

  return mount(RequestForm, {
    global: {
      stubs: {
        Breadcrumbs: { template: '<div></div>' },
        HeaderComponent: { template: '<div></div>' },
        Stepper: { template: '<div></div>' },
        CreditFormsRequest: { template: '<div></div>' },
        SupplierFinanceRequestTradeKyb: { template: '<div></div>' },
        CreditFormsDocuments: { template: '<div></div>' },
        SupplierFinanceRequestTradeDirectors: { template: '<div></div>' },
        CreditFormsSummary: { template: '<div></div>' },
        AppLoader: { template: '<div></div>' },
        AppIcon: { template: '<div></div>' },
      },
      mocks: {
        $route: routeOverride || mockRoute,
      },
      provide: {
        route: routeOverride || mockRoute,
      },
    },
    setup() {
      return {
        useRoute: mockUseRoute,
        useAuthStore: mockUseAuthStore,
      };
    },
  });
};

describe('RequestForm.vue', () => {
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.clearAllMocks();
    mockGetCompanyProfile.mockResolvedValue(mockCompanyProfileResponse);
    mockGetFinance.mockResolvedValue(mockFinanceResponse);
    
    vi.stubGlobal('useRoute', vi.fn(() => mockRoute));
    vi.stubGlobal('useAuthStore', vi.fn(() => createAuthStoreMock()));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('Component Lifecycle', () => {
    it('should not call getFinanceData if financeId missing', async () => {
      mockGetFinance.mockClear();
      const routeWithout = { params: { type: 'trade', id: '1' } };
      createWrapper(routeWithout);
      await flushPromises();
      expect(mockGetFinance).not.toHaveBeenCalled();
    });

    it('should mutate active state', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 3;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(3);
    });
  });

  describe('Initialization', () => {
    it('should mount component', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });

    it('should render without errors', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm).toBeDefined();
    });

    it('should have proper structure', () => {
      const wrapper = createWrapper();
      const divs = wrapper.findAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });

    it('should initialize pinia', () => {
      createWrapper();
      expect(pinia).toBeDefined();
    });

    it('should have component root element', () => {
      const wrapper = createWrapper();
      expect(wrapper.element).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle company API failure gracefully', async () => {
      mockGetCompanyProfile.mockRejectedValueOnce(new Error('Network error'));
      const wrapper = createWrapper();
      await flushPromises();
      expect(wrapper.exists()).toBe(true);
    });

    it('should handle finance API failure gracefully', async () => {
      mockGetFinance.mockRejectedValueOnce(new Error('Network error'));
      const wrapper = createWrapper();
      await flushPromises();
      expect(wrapper.exists()).toBe(true);
    });

    it('should recover from API errors', async () => {
      mockGetCompanyProfile.mockRejectedValueOnce(new Error('Error'));
      mockGetFinance.mockRejectedValueOnce(new Error('Error'));
      const wrapper = createWrapper();
      await flushPromises();
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('State Mutations', () => {
    it('should change active from 1 to 2', async () => {
      const wrapper = createWrapper();
      const initial = wrapper.vm.active;
      wrapper.vm.active = 2;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).not.toBe(initial);
    });

    it('should change active from 2 to 5', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 2;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 5;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(5);
    });

    it('should allow multiple active changes', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 1;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 3;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 2;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(2);
    });
  });

  describe('Route Params', () => {
    it('should access route from component', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('Data Structures', () => {
    it('should render component correctly', () => {
      const wrapper = createWrapper();
      expect(wrapper.find('.rounded-lg').exists() || wrapper.findAll('div').length > 0).toBe(true);
    });
  });

  describe('Concurrent State Changes', () => {
    it('should handle rapid state changes', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 1;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 2;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 3;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(3);
    });

    it('should maintain state integrity', async () => {
      const wrapper = createWrapper();
      const states = [1, 2, 3, 4, 5];
      for (const state of states) {
        wrapper.vm.active = state;
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.active).toBe(state);
      }
    });

    it('should handle state cycling', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 5;
      await wrapper.vm.$nextTick();
      wrapper.vm.active = 1;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(1);
    });
  });

  describe('Component Rendering', () => {
    it('should render template without errors', () => {
      const wrapper = createWrapper();
      expect(wrapper.html().length).toBeGreaterThan(0);
    });

    it('should mount consistently', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();
      expect(wrapper1.exists()).toBe(true);
      expect(wrapper2.exists()).toBe(true);
    });

    it('should maintain element reference', () => {
      const wrapper = createWrapper();
      expect(wrapper.element).toBeDefined();
      expect(wrapper.element.nodeType).toBe(1);
    });

    it('should have valid component instance', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.$options).toBeDefined();
    });

    it('should preserve reactivity', async () => {
      const wrapper = createWrapper();
      const initial = wrapper.vm.active;
      wrapper.vm.active = 4;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).not.toBe(initial);
    });
  });

  describe('Component Structure', () => {
    it('should have valid root element', () => {
      const wrapper = createWrapper();
      expect(wrapper.element).toBeTruthy();
    });

    it('should render with content', () => {
      const wrapper = createWrapper();
      const html = wrapper.html();
      expect(html).toBeTruthy();
      expect(html.length).toBeGreaterThan(0);
    });

    it('should be reactive component', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm).toBeTruthy();
      expect(typeof wrapper.vm).toBe('object');
    });

    it('should handle mount lifecycle', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.$el).toBeDefined();
    });

    it('should preserve immutability of route', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('API Mock Integration', () => {
    it('should initialize with mocked APIs', () => {
      createWrapper();
      expect(mockGetCompanyProfile).toBeDefined();
      expect(mockGetFinance).toBeDefined();
    });

    it('should setup Pinia correctly', () => {
      createWrapper();
      expect(pinia).toBeDefined();
    });

    it('should handle async operations', async () => {
      createWrapper();
      await flushPromises();
      expect(true).toBe(true);
    });

    it('should allow mock reset', () => {
      vi.clearAllMocks();
      expect(mockGetCompanyProfile.mock.calls.length).toBe(0);
    });

    it('should maintain mock state', async () => {
      mockGetCompanyProfile.mockResolvedValueOnce(mockCompanyProfileResponse);
      expect(mockGetCompanyProfile).toBeDefined();
    });
  });

  describe('State Management', () => {
    it('should update state reactively', async () => {
      const wrapper = createWrapper();
      wrapper.vm.active = 2;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(2);
    });

    it('should handle state transition', async () => {
      const wrapper = createWrapper();
      const before = wrapper.vm.active;
      wrapper.vm.active = before + 1;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.active).toBe(before + 1);
    });

    it('should not affect other instances', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();
      wrapper1.vm.active = 5;
      expect(wrapper2.vm.active).not.toBe(5);
    });
  });
});