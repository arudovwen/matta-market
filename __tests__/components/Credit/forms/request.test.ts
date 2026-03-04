import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, reactive, nextTick } from 'vue'
import * as veeValidate from 'vee-validate'
import Request from '~/components/Credit/forms/request.vue'

vi.mock('vee-validate', async () => {
  const actual = await vi.importActual('vee-validate')
  return {
    ...actual,
    useForm: vi.fn((opts) => {
      const form = actual.useForm(opts)
      return {
        ...form,
        handleSubmit: vi.fn((cb) => {
          const wrapper = (e) => cb(opts.initialValues)
          wrapper.fn = cb
          return wrapper
        })
      }
    })
  }
})

describe('Credit Request Component', () => {
  let active
  let formData

  beforeEach(() => {
    active = ref(1)
    formData = reactive({
      amountRequired: 1000,
      tenor: '7 days',
      whereDidYouHearAboutUs: 'Social Media'
    })
  })

  it('renders initial state and static content', () => {
    const wrapper = mount(Request, {
      global: {
        provide: { active, formData },
        stubs: { AppButton: true }
      }
    })

    expect(wrapper.text()).toContain('The credit wallet allows you to buy now')
    expect(wrapper.text()).toContain('You will get a notification via email')
  })

  it('increments active state on button click', async () => {
    const wrapper = mount(Request, {
      global: {
        provide: { active, formData },
        stubs: { AppButton: {
          template: '<button @click="$emit(\'click\')"></button>'
        }}
      }
    })

    await wrapper.find('button').trigger('click')
    expect(active.value).toBe(2)
  })

  it('executes onSubmit logic correctly', async () => {
    let submitHandler
    vi.mocked(veeValidate.useForm).mockImplementationOnce((opts) => {
      const actual = vi.importActual('vee-validate')
      return {
        defineField: vi.fn(() => [ref(''), ref({})]),
        handleSubmit: vi.fn((cb) => {
          submitHandler = cb
          return () => {}
        }),
        errors: reactive({}),
        setFieldValue: vi.fn()
      }
    })

    mount(Request, {
      global: {
        provide: { active, formData },
        stubs: { AppButton: true }
      }
    })

    const testValues = {
      amountRequired: 5000,
      tenor: '30 days',
      whereDidYouHearAboutUs: 'Friend'
    }

    submitHandler(testValues)

    expect(formData.amountRequired).toBe(5000)
    expect(formData.tenor).toBe('30 days')
    expect(formData.whereDidYouHearAboutUs).toBe('Friend')
    expect(active.value).toBe(2)
  })

  it('validates amountRequired with correct schema constraints', async () => {
    const wrapper = mount(Request, {
      global: {
        provide: { active, formData },
        stubs: { AppButton: true }
      }
    })

    const schema = wrapper.vm.schema

    await expect(schema.validateAt('amountRequired', { amountRequired: 'abc' }))
      .rejects.toThrow('invalid value')
    
    await expect(schema.validateAt('amountRequired', { amountRequired: 50 }))
      .rejects.toThrow('Minimum amount is 100 naira')

    await expect(schema.validateAt('amountRequired', { amountRequired: null }))
      .rejects.toThrow('Amount is required')

    const valid = await schema.validateAt('amountRequired', { amountRequired: 200 })
    expect(valid).toBe(200)
  })

  it('validates tenor with correct schema constraints', async () => {
    const wrapper = mount(Request, {
      global: {
        provide: { active, formData },
        stubs: { AppButton: true }
      }
    })

    const schema = wrapper.vm.schema

    await expect(schema.validateAt('tenor', { tenor: '' }))
      .rejects.toThrow('Tenor is required')

    const valid = await schema.validateAt('tenor', { tenor: '14 days' })
    expect(valid).toBe('14 days')
  })
});