// Import the original Vue module
// import * as vue from 'vue';

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MainContent from "~/components/favourites/MainContent.vue";
import Products from "~/components/favourites/ProductsContent.vue";
import SuppliersContent from "~/components/favourites/SuppliersContent.vue";


vi.mock('vue', async () => {
  const vue = await vi.importActual('vue');
  return {
    ...vue,
    inject: (name) => {
      if (name === 'products') return [{}, {}, {}]; // Example products array
      if (name === 'suppliers') return [{}, {}]; // Example suppliers array
      return [];
    },
  };
});

describe('MainContent.vue', () => {
  it('toggles between products and suppliers tabs', async () => {
    const wrapper = mount(MainContent);

    // Check initial state
    expect(wrapper.get('[data-testid="products-tab"]').classes()).toContain('text-white');
    expect(wrapper.get('[data-testid="products-tab"]').classes()).toContain('bg-matta-black');
    expect(wrapper.get('[data-testid="products"]').exists()).toBe(true);
    // expect(wrapper.get('[data-testid="suppliers"]').exists()).toBe(false);

    // Click the suppliers tab
    await wrapper.get('[data-testid="suppliers-tab"]').trigger('click');

    // Check state after click
    expect(wrapper.get('[data-testid="suppliers-tab"]').classes()).toContain('text-white');
    expect(wrapper.get('[data-testid="suppliers-tab"]').classes()).toContain('bg-matta-black');
    expect(wrapper.get('[data-testid="suppliers"]').exists()).toBe(true);
    // expect(wrapper.get('[data-testid="products"]').exists()).toBe(true);

  });
});
