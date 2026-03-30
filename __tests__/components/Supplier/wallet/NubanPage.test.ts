import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import NubanPage from '@/components/Supplier/wallet/NubanPage.vue'

describe('Nuban List Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NubanPage, {
      global: {
        stubs: {
          AppLoader: { template: '<div class="app-loader"></div>' },
          IndexModal: { template: '<div class="index-modal"><slot name="content" /></div>', props: ['isOpen'], emits: ['togglePopup'] },
          SupplierWalletModalsAddBeneficiary: { template: '<div></div>' },
          AppIcon: { template: '<div></div>' }
        }
      }
    })
  })

  it('renders empty state when isEmpty is true and loading is false', () => {
    expect(wrapper.vm.isEmpty).toBe(true)
    expect(wrapper.vm.isPageLoading).toBe(false)
    expect(wrapper.text()).toContain('No account available')
  })

  it('renders table when isEmpty is false', async () => {
    wrapper.vm.isEmpty = false
    wrapper.vm.tdata = [
      { email: 'test1@mail.com', invitationStatusText: 'Expired' },
      { email: 'test2@mail.com', invitationStatusText: 'Invited' },
      { email: 'test3@mail.com', invitationStatusText: 'Verified' }
    ]
    await nextTick()

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('test1@mail.com')
    expect(wrapper.text()).toContain('test2@mail.com')
    expect(wrapper.text()).toContain('test3@mail.com')
  })

  it('renders table headers correctly', () => {
    wrapper.vm.isEmpty = false
    wrapper.vm.tdata = [{ email: 'test@mail.com', invitationStatusText: 'Verified' }]
    
    expect(wrapper.vm.theads).toContain('Account no')
    expect(wrapper.vm.theads).toContain('currency')
    expect(wrapper.vm.theads).toContain('balance')
  })

  it('opens the modal when create button is clicked', async () => {
    const button = wrapper.find('button')
    expect(wrapper.vm.isOpen).toBe(false)
    
    await button.trigger('click')
    
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('closes the modal when isOpen is set to false', async () => {
    wrapper.vm.isOpen = true
    await nextTick()
    
    wrapper.vm.isOpen = false
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('toggles modal visibility correctly', async () => {
    expect(wrapper.vm.isOpen).toBe(false)
    
    wrapper.vm.isOpen = true
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(true)
    
    wrapper.vm.isOpen = false
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('displays invitation status badges correctly', async () => {
    wrapper.vm.isEmpty = false
    wrapper.vm.tdata = [
      { email: 'test1@mail.com', invitationStatusText: 'Expired' },
      { email: 'test2@mail.com', invitationStatusText: 'Invited' },
      { email: 'test3@mail.com', invitationStatusText: 'Verified' }
    ]
    await nextTick()

    const text = wrapper.text()
    expect(text).toContain('Expired')
    expect(text).toContain('Invited')
    expect(text).toContain('Verified')
  })

  it('maintains empty state when tdata is empty', async () => {
    wrapper.vm.isEmpty = true
    wrapper.vm.tdata = []
    await nextTick()

    expect(wrapper.text()).toContain('No account available')
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('initializes with correct default state', () => {
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.vm.isEmpty).toBe(true)
    expect(wrapper.vm.isPageLoading).toBe(false)
    expect(wrapper.vm.tdata).toEqual([])
  })

  it('renders create new button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Create new')
  })

  it('renders title correctly', () => {
    expect(wrapper.text()).toContain('List of Nubans')
  })

  it('handles multiple state changes correctly', async () => {
    wrapper.vm.isEmpty = false
    wrapper.vm.tdata = [{ email: 'test@mail.com', invitationStatusText: 'Verified' }]
    wrapper.vm.isOpen = true
    await nextTick()

    expect(wrapper.vm.isEmpty).toBe(false)
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.vm.tdata.length).toBe(1)
  })
})