import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import EditOrderComponent from '~/components/Supplier/quote/confirmation/edit-order.vue';
import { editOrder } from "~/services/cartservice";
import { toast } from "vue3-toastify";

vi.mock('~/services/cartservice', () => ({
  editOrder: vi.fn()
}));

vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

const mockNavigateTo = vi.fn();
vi.stubGlobal('navigateTo', mockNavigateTo);
vi.stubGlobal('useRoute', () => ({
  params: { id: '123' }
}));

const mockFormValues = {
  productName: '',
  brand: '',
  packageName: '',
  purchaseAmount: '',
  isAvailable: false,
  productId: '',
  packageId: '',
  quoteId: ''
};

const mockErrors = {};

vi.mock('vee-validate', () => ({
  useForm: () => ({
    handleSubmit: (fn) => async (e) => {
      const hasErrors = Object.keys(mockErrors).some(key => mockErrors[key]);
      if (!hasErrors && mockFormValues.productName && mockFormValues.purchaseAmount) {
        return await fn(mockFormValues);
      }
    },
    defineField: (name) => [
      computed({
        get: () => mockFormValues[name],
        set: (val) => {
          mockFormValues[name] = val;
        }
      }),
      {}
    ],
    errors: mockErrors,
    setValues: (values) => {
      Object.assign(mockFormValues, values);
    },
    values: mockFormValues
  })
}));

describe('EditOrderComponent', () => {
  let wrapper;
  const mockGetData = vi.fn();

  const validDetail = {
    productName: 'Test Product',
    brand: 'Test Brand',
    productId: 'prod-1',
    package: {
      purchaseAmount: '5000',
      package: {
        title: 'Plastic drum',
        id: 'pkg-1'
      }
    }
  };

  const createComponent = (propsData = {}) => {
    return mount(EditOrderComponent, {
      props: propsData,
      global: {
        provide: { getData: mockGetData },
        stubs: {
          Textinput: {
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :disabled="disabled" />',
            props: ['modelValue', 'disabled', 'label', 'error', 'name', 'type'],
            emits: ['update:modelValue']
          },
          FormGroup: {
            template: '<div><slot /></div>',
            props: ['label', 'error', 'name']
          },
          SelectVueSelect: {
            template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)" :disabled="disabled"><option value="">Select</option></select>',
            props: ['modelValue', 'options', 'disabled', 'placeholder'],
            emits: ['update:modelValue']
          },
          CurrencyInput: {
            template: '<input type="number" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'min'],
            emits: ['update:modelValue']
          },
          AppButton: {
            template: '<button @click="$emit(\'click\')">{{text}}</button>',
            props: ['text', 'type'],
            emits: ['click']
          }
        }
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFormValues.productName = '';
    mockFormValues.brand = '';
    mockFormValues.packageName = '';
    mockFormValues.purchaseAmount = '';
    mockFormValues.isAvailable = false;
    mockFormValues.productId = '';
    mockFormValues.packageId = '';
    mockFormValues.quoteId = '';
    Object.keys(mockErrors).forEach(key => delete mockErrors[key]);
  });

  it('renders the form with all fields', () => {
    wrapper = createComponent({ detail: null });
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('does not populate form values if detail prop is null', () => {
    wrapper = createComponent({ detail: null });
    expect(wrapper.vm.productName).toBe("");
    expect(wrapper.vm.brand).toBe("");
  });

  it('handles submission errors from the API', async () => {
    const errorMessage = "Update failed";
    editOrder.mockRejectedValue({
      response: { data: { message: errorMessage } }
    });
    mockFormValues.productName = 'Test Product';
    mockFormValues.purchaseAmount = '5000';

    wrapper = createComponent({ detail: validDetail });
    await flushPromises();

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(wrapper.vm.loading).toBe(false);
  });

  it('prevents submission when productName is empty', async () => {
    mockFormValues.productName = '';
    mockFormValues.purchaseAmount = '5000';
    mockErrors.productName = 'Select a package';

    wrapper = createComponent({ detail: null });
    await flushPromises();

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(editOrder).not.toHaveBeenCalled();
  });

  it('prevents submission when purchaseAmount is empty', async () => {
    mockFormValues.productName = 'Test Product';
    mockFormValues.purchaseAmount = '';
    mockErrors.purchaseAmount = 'purchaseAmount is required';

    wrapper = createComponent({ detail: null });
    await flushPromises();

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(editOrder).not.toHaveBeenCalled();
  });

  it('initializes with correct default state', () => {
    wrapper = createComponent({ detail: null });

    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.packageForms).toHaveLength(8);
  });

  it('renders package form options correctly', () => {
    wrapper = createComponent({ detail: null });

    const expectedPackages = [
      'Plastic drum',
      'Metal drum',
      'Keg',
      'Carton',
      'Bag',
      'Cylinder',
      'Tank',
      'Others'
    ];

    expectedPackages.forEach(pkg => {
      expect(wrapper.vm.packageForms.some(p => p.label === pkg)).toBe(true);
    });
  });

  it('handles loading state during submission', async () => {
    editOrder.mockResolvedValue({ status: 200 });
    mockFormValues.productName = 'Test Product';
    mockFormValues.purchaseAmount = '5000';

    wrapper = createComponent({ detail: validDetail });
    await flushPromises();

    expect(wrapper.vm.loading).toBe(false);

    const form = wrapper.find('form');
    const submitPromise = form.trigger('submit.prevent');

    expect(wrapper.vm.loading).toBe(true);

    await submitPromise;
    await flushPromises();

    expect(wrapper.vm.loading).toBe(false);
  });

  it('clears form data appropriately', () => {
    wrapper = createComponent({ detail: validDetail });

    wrapper.vm.productName = '';
    wrapper.vm.purchaseAmount = '';

    expect(wrapper.vm.productName).toBe('');
    expect(wrapper.vm.purchaseAmount).toBe('');
  });

  it('sends correct data structure to editOrder', async () => {
    editOrder.mockResolvedValue({ status: 200 });
    mockFormValues.productName = 'Test Product';
    mockFormValues.brand = 'Test Brand';
    mockFormValues.purchaseAmount = '5000';
    mockFormValues.packageName = 'Plastic drum';
    mockFormValues.packageId = 'pkg-1';

    wrapper = createComponent({ detail: validDetail });
    await flushPromises();

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await flushPromises();

    expect(editOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        productName: 'Test Product',
        brand: 'Test Brand',
        purchaseAmount: '5000'
      })
    );
  });
});