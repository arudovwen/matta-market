import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, reactive, nextTick } from 'vue';
import SummaryComponent from '~/components/Credit/forms/summary.vue';
import { postCreditRequest } from '~/services/creditservice';
import moment from 'moment';

vi.mock('~/services/creditservice', () => ({
  postCreditRequest: vi.fn(),
}));

vi.mock('moment', () => ({
  default: vi.fn(() => ({
    format: vi.fn(() => 'Oct 24, 2023'),
  })),
}));

const mockNavigateTo = vi.fn();
vi.stubGlobal('navigateTo', mockNavigateTo);
vi.stubGlobal('useRoute', () => ({ params: {} }));
vi.stubGlobal('useRuntimeConfig', () => ({ public: { encryptionKey: 'test' } }));

describe('SummaryComponent', () => {
  let active, company, formData;

  beforeEach(() => {
    vi.clearAllMocks();
    active = ref(5);
    company = ref({
      companyName: 'Test Corp',
      companyType: 'LLC',
      dateofIncorporation: '2023-10-24',
      sector: 'Tech',
      address: '123 Street',
    });
    formData = reactive({
      amount: 1000,
      supportingDocuments: [{ id: 1, urls: [{ url: 'link1' }] }],
    });
  });

  const createComponent = () => mount(SummaryComponent, {
    global: {
      provide: { active, company, formData },
      config: {
        globalProperties: {
          navigateTo: mockNavigateTo
        }
      },
      stubs: {
        AppButton: {
          template: '<button @click="$emit(\'click\')"><slot /></button>',
          props: ['disabled', 'isLoading'],
        },
        Checkbox: {
          template: '<input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" />',
          props: ['modelValue'],
        },
        ActionModal: {
          name: 'ActionModal',
          template: '<div v-if="open" class="modal-stub"><button class="action-btn" @click="$emit(\'actionItem\')"></button><button class="close-btn" @click="$emit(\'close\')"></button></div>',
          props: ['open'],
        },
      },
    },
  });

  it('renders summary data correctly from bankOptions', () => {
    const wrapper = createComponent();
    expect(wrapper.text()).toContain('Test Corp');
    expect(wrapper.text()).toContain('Oct 24, 2023');
  });

  it('decrements active on back button click', async () => {
    const wrapper = createComponent();
    await wrapper.findAll('button')[0].trigger('click');
    expect(active.value).toBe(4);
  });

  it('handles successful form submission', async () => {
    postCreditRequest.mockResolvedValue({ status: 200 });
    const wrapper = createComponent();
    
    await wrapper.find('input[type="checkbox"]').setValue(true);
    await wrapper.findAll('button')[1].trigger('click');

    await vi.waitFor(() => expect(wrapper.vm.isSuccessOpen).toBe(true));
    
    const successModal = wrapper.findComponent('.modal-stub');
    await successModal.find('.action-btn').trigger('click');
    
    expect(mockNavigateTo).toHaveBeenCalledWith('/wallet/home');
    
    await successModal.find('.close-btn').trigger('click');
    expect(wrapper.vm.isSuccessOpen).toBe(false);
  });

  it('handles submission error with Message property', async () => {
    postCreditRequest.mockRejectedValue({
      response: { data: { Message: 'Error Message' } }
    });
    const wrapper = createComponent();
    
    await wrapper.find('input[type="checkbox"]').setValue(true);
    await wrapper.findAll('button')[1].trigger('click');

    await vi.waitFor(() => expect(wrapper.vm.isErrorOpen).toBe(true));

    const errorModal = wrapper.findComponent('.modal-stub');
    await errorModal.find('.close-btn').trigger('click'); 
    expect(wrapper.vm.isErrorOpen).toBe(false);
  });

  it('handles submission error with message property', async () => {
    postCreditRequest.mockRejectedValue({
      response: { data: { message: 'error message' } }
    });
    const wrapper = createComponent();
    
    await wrapper.find('input[type="checkbox"]').setValue(true);
    await wrapper.findAll('button')[1].trigger('click');

    await vi.waitFor(() => expect(wrapper.vm.isErrorOpen).toBe(true));

    const errorModal = wrapper.findComponent('.modal-stub');
    await errorModal.find('.action-btn').trigger('click');
    expect(wrapper.vm.isErrorOpen).toBe(false);
  });
});