import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import OrderDetailComponent from '@/components/Supplier/quote/confirmation/Item.vue';

describe('OrderDetailComponent', () => {
  let wrapper;
  const mockOrder = { status: 0 };

  const detailProp = {
    productName: 'Chemical Compound',
    brand: 'Acme Corp',
    productImg: '/custom-img.png',
    quantity: 5,
    package: {
      purchaseAmount: 15000,
      package: {
        title: 'Plastic Drum'
      }
    }
  };

  const createComponent = (props = { detail: detailProp }, orderStatus = 0) => {
    mockOrder.status = orderStatus;
    return mount(OrderDetailComponent, {
      props,
      global: {
        provide: {
          order: mockOrder
        },
        stubs: {
          AppButton: {
            template: '<button @click="$emit(\'click\')">{{ text }}</button>',
            props: ['text', 'icon', 'btnClass', 'iconClass'],
            emits: ['click']
          },
          IndexModal: {
            name: 'IndexModal',
            template: '<div id="modal" v-if="isOpen"><slot name="content" /></div>',
            props: ['isOpen'],
            emits: ['togglePopup']
          },
          EditOrder: {
            name: 'EditOrder',
            template: '<div id="edit-order"></div>',
            emits: ['close']
          }
        },
        config: {
          globalProperties: {
            currencyFormat: (val) => `₦${val}`
          }
        }
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders detail data correctly', () => {
    wrapper = createComponent();
    expect(wrapper.text()).toContain('Chemical Compound');
    expect(wrapper.text()).toContain('Acme Corp');
    expect(wrapper.text()).toContain('Plastic Drum');
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).toContain('₦15000');
    expect(wrapper.find('img').attributes('src')).toContain('/custom-img.png');
  });

  it('renders fallback values when data is missing', () => {
    wrapper = createComponent({
      detail: {
        ...detailProp,
        brand: null,
        productImg: null
      }
    });
    expect(wrapper.text()).toContain('n/a');
    expect(wrapper.find('img').attributes('src')).toContain('/images/imgplace.png');
  });

  it('shows Edit Order button only when order status is 0', async () => {
    wrapper = createComponent(undefined, 0);
    expect(wrapper.find('button').exists()).toBe(true);

    wrapper = createComponent(undefined, 1);
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('opens modal when Edit Order button is clicked', async () => {
    wrapper = createComponent();
    
    expect(wrapper.vm.open).toBe(false);
    
    await wrapper.find('button').trigger('click');
    await nextTick();
    
    expect(wrapper.vm.open).toBe(true);
  });

  it('renders modal when open is true', async () => {
    wrapper = createComponent();
    
    wrapper.vm.open = true;
    await nextTick();
    
    const modal = wrapper.findComponent({ name: 'IndexModal' });
    expect(modal.exists()).toBe(true);
  });

  it('does not render modal when open is false', async () => {
    wrapper = createComponent();
    
    wrapper.vm.open = false;
    await nextTick();
    
    const modal = wrapper.findComponent({ name: 'IndexModal' });
    expect(modal.exists()).toBe(false);
  });

  it('closes modal when togglePopup event is emitted', async () => {
    wrapper = createComponent();
    
    wrapper.vm.open = true;
    await nextTick();
    
    const modal = wrapper.findComponent({ name: 'IndexModal' });
    expect(modal.exists()).toBe(true);
    
    await modal.vm.$emit('togglePopup');
    await nextTick();
    
    expect(wrapper.vm.open).toBe(false);
  });

  it('renders EditOrder component inside modal when open', async () => {
    wrapper = createComponent();
    
    wrapper.vm.open = true;
    await nextTick();
    
    const editOrder = wrapper.findComponent({ name: 'EditOrder' });
    expect(editOrder.exists()).toBe(true);
  });

  it('closes modal when EditOrder emits close event', async () => {
    wrapper = createComponent();
    
    wrapper.vm.open = true;
    await nextTick();
    
    const editOrder = wrapper.findComponent({ name: 'EditOrder' });
    await editOrder.vm.$emit('close');
    await nextTick();
    
    expect(wrapper.vm.open).toBe(false);
  });

  it('renders product image with correct dimensions', () => {
    wrapper = createComponent();
    
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('width')).toBe('110');
    expect(img.attributes('height')).toBe('110');
  });

  it('renders all product information fields', () => {
    wrapper = createComponent();
    
    const text = wrapper.text();
    expect(text).toContain('Chemical Compound');
    expect(text).toContain('Brand');
    expect(text).toContain('Acme Corp');
    expect(text).toContain('Packaging');
    expect(text).toContain('Quantity');
  });

  it('handles missing quantity gracefully', () => {
    wrapper = createComponent({
      detail: {
        ...detailProp,
        quantity: undefined
      }
    });
    
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('initializes with open state as false', () => {
    wrapper = createComponent();
    expect(wrapper.vm.open).toBe(false);
  });

  it('toggles open state multiple times', async () => {
    wrapper = createComponent();
    
    expect(wrapper.vm.open).toBe(false);
    
    wrapper.vm.open = true;
    await nextTick();
    expect(wrapper.vm.open).toBe(true);
    
    wrapper.vm.open = false;
    await nextTick();
    expect(wrapper.vm.open).toBe(false);
  });

  it('only shows edit button when order status equals 0', async () => {
    wrapper = createComponent(undefined, 0);
    let editBtn = wrapper.find('button');
    expect(editBtn.exists()).toBe(true);
    expect(editBtn.text()).toContain('Edit Order');

    wrapper = createComponent(undefined, 1);
    editBtn = wrapper.find('button');
    expect(editBtn.exists()).toBe(false);
  });
});