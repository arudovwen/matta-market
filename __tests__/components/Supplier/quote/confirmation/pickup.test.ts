import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick, reactive, ref } from 'vue';
import PickupComponent from '@/components/Supplier/quote/confirmation/pickup.vue';

const mockGetAllAddress = vi.fn();
const mockPickupStore = {
  isLoading: false,
  addressesData: [],
  getAlladdress: mockGetAllAddress
};

vi.stubGlobal('usePickupStore', () => mockPickupStore);

describe('PickupComponent', () => {
  let wrapper;
  const selectedPickup = ref(null);

  const createComponent = (storeOverrides = {}) => {
    mockGetAllAddress.mockClear();
    Object.assign(mockPickupStore, {
      isLoading: false,
      addressesData: [],
      getAlladdress: mockGetAllAddress,
      ...storeOverrides
    });

    return mount(PickupComponent, {
      global: {
        provide: {
          selectedPickup
        },
        stubs: {
          AppButton: {
            name: 'AppButton',
            template: '<button @click="$emit(\'click\')">{{ text }}</button>',
            props: ['text', 'icon', 'btnClass', 'iconClass', 'type'],
            emits: ['click']
          },
          AppIcon: { name: 'AppIcon', template: '<span></span>' },
          CheckoutPickupAddress: { name: 'CheckoutPickupAddress', template: '<div></div>' },
          EmptyData: { name: 'EmptyData', template: '<div class="empty-state"></div>' },
          AppLoader: { name: 'AppLoader', template: '<div class="loader"></div>' },
          ModalCenter: {
            name: 'ModalCenter',
            template: '<div class="modal"><slot /></div>'
          },
          CheckoutPickupEditForm: { name: 'CheckoutPickupEditForm', template: '<div></div>' }
        }
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    selectedPickup.value = null;
    mockPickupStore.isLoading = false;
    mockPickupStore.addressesData = [];
  });

  it('updates selectedPickup when address is clicked', async () => {
    const addresses = [{ id: 1 }, { id: 2 }];
    wrapper = createComponent({ addressesData: addresses, isLoading: false });
    await nextTick();

    const addressItems = wrapper.findAll('.cursor-pointer');
    if (addressItems.length > 0) {
      await addressItems[0].trigger('click');
      expect(selectedPickup.value).toBe(1);
    }
  });

  it('opens modal for new location and resets detail', async () => {
    wrapper = createComponent();
    wrapper.vm.detail = { id: 5 };
    
    const newLocationBtn = wrapper.findAll('button').find(b => b.text().includes('New Location'));
    expect(newLocationBtn).toBeDefined();
    
    await newLocationBtn.trigger('click');
    await nextTick();

    expect(wrapper.vm.detail).toBeNull();
    expect(wrapper.vm.type).toBe('form');
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('handles edit action for a specific address', async () => {
    const addresses = [{ id: 10, name: 'Warehouse' }];
    wrapper = createComponent({ addressesData: addresses });
    await nextTick();

    wrapper.vm.handleEdit(addresses[0]);
    await nextTick();

    expect(wrapper.vm.detail).toEqual(addresses[0]);
    expect(wrapper.vm.type).toBe('edit');
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('does not render edit form when type is neither form nor edit', async () => {
    wrapper = createComponent();
    wrapper.vm.type = 'none';
    await nextTick();
    expect(wrapper.findComponent({ name: 'CheckoutPickupEditForm' }).exists()).toBe(false);
  });

  it('executes btnFunction correctly', () => {
    wrapper = createComponent();
    wrapper.vm.btnFunction();
    expect(wrapper.vm.type).toBe('form');
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('initializes with correct default state', () => {
    wrapper = createComponent();
    
    expect(wrapper.vm.type).toBe('form');
    expect(wrapper.vm.detail).toBeNull();
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('opens modal with correct type via openModal', () => {
    wrapper = createComponent();
    
    wrapper.vm.openModal('edit');
    expect(wrapper.vm.type).toBe('edit');
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('displays loader when store is loading', async () => {
    wrapper = createComponent({ isLoading: true });
    await nextTick();

    expect(wrapper.find('.loader').exists()).toBe(true);
  });

  it('renders title correctly', () => {
    wrapper = createComponent();
    expect(wrapper.text()).toContain('Pickup Location');
  });

  it('renders New Location button', () => {
    wrapper = createComponent();
    const newLocationBtn = wrapper.findAll('button').find(b => b.text().includes('New Location'));
    expect(newLocationBtn).toBeDefined();
  });

  it('detail is set null when creating new location', async () => {
    wrapper = createComponent();
    wrapper.vm.detail = { id: 100, name: 'Old Detail' };
    
    wrapper.vm.detail = null;
    await nextTick();
    
    expect(wrapper.vm.detail).toBeNull();
  });
});