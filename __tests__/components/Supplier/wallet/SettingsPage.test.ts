import { shallowMount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import SettingsPage from '@/components/Supplier/wallet/SettingsPage.vue'
import * as walletService from '~/services/walletservice'

vi.mock('~/services/walletservice', () => ({
  getWalletDetails: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ query: {} }))
}))

describe('Settings Page Component', () => {
  const mockData = { data: { data: { id: 1 } } }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles API error and stops loading states', async () => {
    walletService.getWalletDetails.mockRejectedValue(new Error('Network Error'))

    const wrapper = shallowMount(SettingsPage, {
      global: {
        stubs: {
          SupplierWalletSettingsTransactionPin: { template: '<div id="pin-stub"></div>' }
        }
      }
    })

    await flushPromises()
    await nextTick()
    
    expect(wrapper.find('#pin-stub').exists()).toBe(false)
  })

  it('provides the correct data to children', async () => {
    walletService.getWalletDetails.mockResolvedValue(mockData)

    const wrapper = shallowMount(SettingsPage)

    await flushPromises()
    await nextTick()
    
    const providedDetails = wrapper.vm.$.provides.details
    expect(providedDetails.value).toEqual(mockData.data.data)
  })
})