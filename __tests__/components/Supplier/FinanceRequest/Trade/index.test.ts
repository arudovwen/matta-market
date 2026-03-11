import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import index from '~/components/Supplier/FinanceRequest/Trade/index.vue';
import { getCompanyProfile } from "~/services/settingservices";
import { getFinance } from "~/services/financeservice";
import { getDraft } from "~/services/requestservice";

vi.mock('~/services/settingservices', () => ({
  getCompanyProfile: vi.fn()
}));
vi.mock('~/services/financeservice', () => ({
  getFinance: vi.fn()
}));
vi.mock('~/services/requestservice', () => ({
  getDraft: vi.fn()
}));

const mockRoute = {
  params: {
    financeId: '123',
    type: 'Business',
    id: '1'
  }
};

const mockAuthStore = {
  userInfo: { email: 'test@test.com', phoneNumber: '12345' },
  userId: 'user-123'
};

vi.stubGlobal('useRoute', () => mockRoute);
vi.stubGlobal('useAuthStore', () => mockAuthStore);
vi.stubGlobal('ref', ref);
vi.stubGlobal('reactive', reactive);
vi.stubGlobal('onMounted', onMounted);
vi.stubGlobal('provide', vi.fn());

describe('Financing Request Component', () => {
  const successResponse = {
    status: 200,
    data: {
      data: {
        amountRequired: 1000,
        tenor: 12,
        whereDidYouHearAboutUs: 'Social Media',
        supportingDocuments: [{ urls: ['url1'], documentType: 0 }],
        haveyoudonebusiness: 'yes',
        haveyouexportedtotheothercourty: 'no',
        companyDocuments: [{ urls: [{ url: 'test.com' }], documentType: 0 }]
      }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getCompanyProfile.mockResolvedValue(successResponse);
    getFinance.mockResolvedValue(successResponse);
    getDraft.mockResolvedValue(successResponse);
  });

  it('renders step 1 and data after mounting', async () => {
    const wrapper = mount(index, {
      global: {
        stubs: {
          HeaderComponent: {
            props: ['title'],
            template: '<div class="header-stub">{{ title }}</div>'
          },
          Stepper: true,
          LoanRequest: true,
          AppLoader: true
        }
      }
    });
    
    await flushPromises();
    
    expect(wrapper.findComponent({ name: 'LoanRequest' }).exists()).toBe(true);
    expect(wrapper.find('.header-stub').text()).toContain('Financing request');
  });

  it('handles company profile with no documents and non-nigeria country', async () => {
    getCompanyProfile.mockResolvedValueOnce({
      data: {
        data: {
          country: 'Ghana',
          companyDocuments: []
        }
      }
    });
    mount(index);
    await flushPromises();
  });

  it('handles company profile with urls as strings', async () => {
    getCompanyProfile.mockResolvedValueOnce({
      data: {
        data: {
          country: 'Nigeria',
          companyDocuments: [{ urls: ['direct-url-string'], documentType: 0 }]
        }
      }
    });
    mount(index);
    await flushPromises();
  });

  it('switches steps correctly and applies conditional classes', async () => {
    const wrapper = mount(index, {
      global: {
        stubs: ['Kyb', 'Directors', 'Documents', 'Final', 'Stepper', 'HeaderComponent', 'LoanRequest']
      }
    });
    await flushPromises();
    
    wrapper.vm.active = 2;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'Kyb' }).exists()).toBe(true);

    wrapper.vm.active = 3;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'Directors' }).exists()).toBe(true);
    expect(wrapper.find('.mx-auto').classes()).not.toContain('max-w-[676px]');

    wrapper.vm.active = 4;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'Documents' }).exists()).toBe(true);

    wrapper.vm.active = 5;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'Final' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Stepper' }).exists()).toBe(false);
  });

  it('handles service rejections for full coverage', async () => {
    getCompanyProfile.mockRejectedValue(new Error('Failed'));
    getFinance.mockRejectedValue(new Error('Failed'));
    getDraft.mockRejectedValue(new Error('Failed'));
    
    const wrapper = mount(index);
    await flushPromises();
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.isfetching).toBe(false);
  });

  it('skips finance data fetch if financeId is missing', async () => {
    mockRoute.params.financeId = null;
    mount(index);
    await flushPromises();
    expect(getFinance).not.toHaveBeenCalled();
    mockRoute.params.financeId = '123';
  });

  it('handles draft and finance responses with no supporting documents', async () => {
    const emptyDocsResponse = {
      status: 200,
      data: { data: { supportingDocuments: [] } }
    };
    getDraft.mockResolvedValue(emptyDocsResponse);
    getFinance.mockResolvedValue(emptyDocsResponse);
    mount(index);
    await flushPromises();
  });

  it('handles draft and finance with status other than 200', async () => {
    const errorStatus = { status: 400 };
    getDraft.mockResolvedValue(errorStatus);
    getFinance.mockResolvedValue(errorStatus);
    mount(index);
    await flushPromises();
  });
});