import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue';
import Side from '~/components/Supplier/quote/confirmation/Side.vue';
import { confirmavailablilty } from "~/services/quoteservice";
import { toast } from "vue3-toastify";

vi.mock('~/services/quoteservice', () => ({
  confirmavailablilty: vi.fn()
}));

vi.mock('vue3-toastify', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 'test-id' }
  })
}));

vi.mock('~/components/IndexModal', () => ({
  default: {
    name: 'Modal',
    template: '<div v-if="isOpen" id="modal-stub"><slot name="content" /></div>',
    props: ['isOpen']
  }
}));

describe('Side Component', () => {
  let wrapper;
  const mockSelectedPickup = ref(null);
  const mockOrder = {
    productName: 'Chemical X',
    quantity: 10,
    status: 0,
    package: {
      purchaseAmount: 500,
      package: { title: 'Drum' }
    }
  };

  const createComponent = (orderData = mockOrder) => {
    return mount(Side, {
      global: {
        provide: {
          selectedPickup: mockSelectedPickup,
          order: orderData
        },
        stubs: {
          AppButton: {
            template: '<button @click="$emit(\'click\')"><slot />{{text}}</button>',
            props: ['text', 'isLoading', 'isDisabled']
          }
        },
        config: {
          globalProperties: {
            currencyFormat: (val) => `NLE ${val}`,
            errorResponse: vi.fn()
          }
        }
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelectedPickup.value = null;
  });

  it('renders order details correctly', () => {
    wrapper = createComponent();
    expect(wrapper.text()).toContain('Chemical X');
    expect(wrapper.text()).toContain('Qty: 10 Drum');
  });

  it('hides buttons when order status is not 0', () => {
    wrapper = createComponent({ ...mockOrder, status: 1 });
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('shows toast info if no pickup location is selected on confirm', async () => {
    wrapper = createComponent();
    await wrapper.findAll('button')[0].trigger('click');
    expect(toast.info).toHaveBeenCalledWith("Select a pickup location");
  });

  it('calls sendConfirmation successfully for available status', async () => {
    mockSelectedPickup.value = 'location-1';
    confirmavailablilty.mockResolvedValue({ status: 200 });
    wrapper = createComponent();
    await wrapper.findAll('button')[0].trigger('click');
    await flushPromises();
    expect(confirmavailablilty).toHaveBeenCalledWith({ id: 'test-id', status: 2 });
    expect(toast.success).toHaveBeenCalledWith("Successful");
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('opens modal when Confirm Unavailable is clicked', async () => {
    mockSelectedPickup.value = 'location-1';
    wrapper = createComponent();
    await wrapper.findAll('button')[1].trigger('click');
    await nextTick();
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.html()).toContain('Reason for Quote/Order Decline');
  });

  it('shows error if submitting decline without a reason', async () => {
    mockSelectedPickup.value = 'location-1';
    wrapper = createComponent();
    wrapper.vm.reason = ""; // Ensure reason is empty
    
    // Call method directly because the button is disabled in the UI
    await wrapper.vm.submitDecline();

    expect(toast.error).toHaveBeenCalledWith("Please select a reason before submitting");
  });

  it('submits decline with reason successfully', async () => {
    mockSelectedPickup.value = 'location-1';
    confirmavailablilty.mockResolvedValue({ status: 200 });
    wrapper = createComponent();
    await wrapper.findAll('button')[1].trigger('click');
    await nextTick();

    const radio = wrapper.find('input[type="radio"]');
    await radio.setChecked();
    
    const submitBtn = wrapper.findAll('button').find(b => b.text().includes('Submit'));
    await submitBtn.trigger('click');
    await flushPromises();

    expect(confirmavailablilty).toHaveBeenCalledWith({
      id: 'test-id',
      status: 3,
      reason: "Price changes"
    });
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('handles API errors gracefully', async () => {
    mockSelectedPickup.value = 'location-1';
    confirmavailablilty.mockRejectedValue(new Error('API Error'));
    wrapper = createComponent();
    await wrapper.findAll('button')[0].trigger('click');
    await flushPromises();
    expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    expect(wrapper.vm.loading).toBe(false);
  });
});