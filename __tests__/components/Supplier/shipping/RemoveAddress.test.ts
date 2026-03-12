import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RemoveAddress from '@/components/Supplier/shipping/RemoveAddress.vue';

describe('RemoveAddress.vue', () => {
  it('renders correctly and interacts with buttons', async () => {
    const wrapper = mount(RemoveAddress);

    expect(wrapper.text()).toContain('Remove shipping address');
    expect(wrapper.text()).toContain('Are you sure you want to remove this address?');

    const cancelButton = wrapper.find('button[type="button"]');
    const removeButton = wrapper.find('button[type="submit"]');

    expect(cancelButton.text()).toBe('cancel');
    expect(removeButton.text()).toBe('remove');

    await cancelButton.trigger('click');
    await removeButton.trigger('click');

    expect(wrapper.exists()).toBe(true);
  });
});