import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick, ref } from 'vue'
import SideBox from '@/components/Supplier/wallet/SideBox.vue'
import { getWalletDetails } from '~/services/walletservice'
import { getBanks, viewSettlement } from '~/services/settlementservice'
import { getCreditDetail } from '~/services/creditservice'

vi.mock('~/services/walletservice')
vi.mock('~/services/settlementservice')
vi.mock('~/services/creditservice')
vi.mock('vue3-toastify', () => ({ toast: { success: vi.fn() } }))

const mockAuthStore = {
  userInfo: { firstName: 'John', lastName: 'Doe' }
}

const mockRoute = { query: {} }

vi.stubGlobal('useAuthStore', () => mockAuthStore)
vi.stubGlobal('useRoute', () => mockRoute)

describe('SideBox Component', () => {
  const mockBalance = { availableBalance: 5000, ledgerBalance: 6000 }
  const mockGetLedgers = vi.fn()
  
  const createComponent = () => {
    return mount(SideBox, {
      global: {
        stubs: {
          AppIcon: true,
          AppButton: { 
            template: '<button @click="$emit(\'click\')">{{text}}</button>', 
            props: ['text', 'disabled'],
            emits: ['click']
          },
          IndexModal: { 
            template: '<div><slot name="content" /></div>', 
            props: ['isOpen'],
            emits: ['togglePopup']
          },
          ActionModal: true,
          SupplierWalletModalsTopUp: true,
          SupplierWalletModalsWithdrawalModal: true,
          SupplierWalletModalsCreateWallet: true,
          RepayLoan: true
        },
        directives: {
          clipboard: {
            mounted(el, binding) {
              el.addEventListener('click', () => {
                navigator.clipboard.writeText(binding.value)
              })
            }
          }
        },
        provide: {
          balance: ref(mockBalance),
          getLedgersTrans: mockGetLedgers
        },
        mocks: {
          currencyFormat: (val) => `$${val}`
        }
      }
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    getWalletDetails.mockResolvedValue({ 
      data: { data: { bankName: 'Test Bank', accountNumber: '1234567890', accountName: 'John Doe' } } 
    })
    getCreditDetail.mockResolvedValue({ 
      data: { data: { id: 1, availableCredit: 10000, creditUsed: 2000 } } 
    })
    viewSettlement.mockResolvedValue({ 
      status: true, 
      data: { data: [{ id: 1 }] } 
    })
    getBanks.mockResolvedValue({ 
      status: 200, 
      data: { data: { responseBody: [{ name: 'Bank A', code: 1 }] } } 
    })
  })

  it('renders and fetches data on mount', async () => {
    const wrapper = createComponent()
    await flushPromises()

    expect(getWalletDetails).toHaveBeenCalled()
    expect(viewSettlement).toHaveBeenCalled()
    expect(getBanks).toHaveBeenCalled()
  })

  it('initializes with correct default state', () => {
    const wrapper = createComponent()
    
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.vm.isLoading).toBe(true)
    expect(wrapper.vm.hasWallet).toBe(false)
    expect(wrapper.vm.hasCredit).toBe(false)
  })

  it('sets hasWallet and hasCredit after successful fetch', async () => {
    const wrapper = createComponent()
    await flushPromises()

    expect(wrapper.vm.hasWallet).toBe(true)
    expect(wrapper.vm.hasCredit).toBe(true)
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('handles withdrawal click when hasWallet is false', async () => {
    const wrapper = createComponent()
    await flushPromises()
    
    wrapper.vm.hasWallet = false
    await nextTick()
    
    const withdrawBtn = wrapper.findAll('button').find(b => b.text() === 'Withdraw')
    expect(withdrawBtn).toBeDefined()
    
    await withdrawBtn.trigger('click')
    await nextTick()

    expect(wrapper.vm.isCreatingWallet).toBe(true)
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('handles withdrawal click when hasWallet is true', async () => {
    const wrapper = createComponent()
    await flushPromises()
    
    wrapper.vm.hasWallet = true
    await nextTick()
    
    const withdrawBtn = wrapper.findAll('button').find(b => b.text() === 'Withdraw')
    await withdrawBtn.trigger('click')
    await nextTick()

    expect(wrapper.vm.isWithdraw).toBe(true)
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('handles fund wallet click', async () => {
    const wrapper = createComponent()
    await flushPromises()
    
    const fundBtn = wrapper.findAll('button').find(b => b.text() === 'Fund wallet')
    expect(fundBtn).toBeDefined()
    
    await fundBtn.trigger('click')
    await nextTick()

    expect(wrapper.vm.isTopup).toBe(true)
    expect(wrapper.vm.type).toBe('fund')
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('activateWallet updates state correctly', async () => {
    const wrapper = createComponent()
    
    await wrapper.vm.activateWallet()
    
    expect(wrapper.vm.type).toBe('fund')
    expect(wrapper.vm.isCreatingWallet).toBe(true)
    expect(wrapper.vm.isTopup).toBe(false)
  })

  it('handleComplete with withdraw type', async () => {
    const wrapper = createComponent()
    
    wrapper.vm.handleComplete('success', 'withdraw')
    
    expect(wrapper.vm.isWithdraw).toBe(true)
  })

  it('handleComplete with fund type', async () => {
    const wrapper = createComponent()
    
    wrapper.vm.handleComplete('success', 'fund')
    
    expect(wrapper.vm.isTopup).toBe(true)
  })

  it('handleComplete with no type shows success modal', async () => {
    const wrapper = createComponent()
    
    wrapper.vm.handleComplete('Transaction completed')
    
    expect(wrapper.vm.isSuccessOpen).toBe(true)
    expect(wrapper.vm.completeText).toBe('Transaction completed')
  })

  it('handleClose resets all modal states', () => {
    const wrapper = createComponent()
    
    wrapper.vm.isOpen = true
    wrapper.vm.isWithdraw = true
    wrapper.vm.isTopup = true
    wrapper.vm.isCreatingWallet = true
    wrapper.vm.isRepay = true
    wrapper.vm.isSuccessOpen = true
    
    wrapper.vm.handleClose()
    
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.vm.isWithdraw).toBe(false)
    expect(wrapper.vm.isTopup).toBe(false)
    expect(wrapper.vm.isCreatingWallet).toBe(false)
    expect(wrapper.vm.isRepay).toBe(false)
    expect(wrapper.vm.isSuccessOpen).toBe(false)
  })

  it('catches API errors in handleWalletDetails', async () => {
    getWalletDetails.mockRejectedValueOnce(new Error('API Error'))
    getCreditDetail.mockRejectedValueOnce(new Error('API Error'))
    
    const wrapper = createComponent()
    await flushPromises()

    expect(wrapper.vm.hasWallet).toBe(false)
    expect(wrapper.vm.hasCredit).toBe(false)
  })

  it('handles checkSettlement with no settlements', async () => {
    viewSettlement.mockResolvedValueOnce({ status: false, data: { data: [] } })
    
    const wrapper = createComponent()
    await flushPromises()
    
    expect(wrapper.vm.hasSettlement).toBe(false)
  })

  it('handles checkSettlement with settlements', async () => {
    viewSettlement.mockResolvedValueOnce({ 
      status: true, 
      data: { data: [{ id: 1, amount: 1000 }] } 
    })
    
    const wrapper = createComponent()
    await flushPromises()
    
    expect(wrapper.vm.hasSettlement).toBe(true)
    expect(wrapper.vm.settlements.length).toBeGreaterThan(0)
  })

  it('transforms bank data correctly', async () => {
    const wrapper = createComponent()
    await flushPromises()

    expect(wrapper.vm.banks.length).toBeGreaterThan(0)
    expect(wrapper.vm.banks[0].label).toBe('Bank A')
    expect(wrapper.vm.banks[0].value).toBe('1')
  })

  it('updates details after successful wallet fetch', async () => {
    const wrapper = createComponent()
    await flushPromises()

    expect(wrapper.vm.details).toEqual({ 
      bankName: 'Test Bank', 
      accountNumber: '1234567890',
      accountName: 'John Doe'
    })
  })

  it('renders bank transfer information when hasWallet is true', async () => {
    const wrapper = createComponent()
    await flushPromises()

    wrapper.vm.hasWallet = true
    await nextTick()

    const bankInfo = wrapper.text()
    expect(bankInfo).toContain('Bank Transfer Information')
  })

  it('hides action buttons when loading', async () => {
    const wrapper = createComponent()
    
    wrapper.vm.isLoading = true
    await nextTick()

    const buttons = wrapper.findAll('button')
    const withdrawBtn = buttons.find(b => b.text() === 'Withdraw')
    expect(withdrawBtn).toBeUndefined()
  })

  it('shows action buttons when not loading', async () => {
    const wrapper = createComponent()
    await flushPromises()

    wrapper.vm.isLoading = false
    await nextTick()

    const buttons = wrapper.findAll('button')
    const withdrawBtn = buttons.find(b => b.text() === 'Withdraw')
    expect(withdrawBtn).toBeDefined()
  })
})