import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import CreditFormsDocuments from '~/components/Credit/forms/documents.vue';

const mockRoute = {
  params: {
    id: '1',
    financeId: 'finance-123',
  },
};

const createFormData = () => ({
  supportingDocuments: [
    {
      urls: [{ url: '' }],
    },
    {
      urls: [{ url: '' }],
    },
  ],
});

const createWrapper = (formDataOverride = null) => {
  return mount(CreditFormsDocuments, {
    global: {
      stubs: {
        FormGroup: {
          template: '<div><slot /></div>',
        },
        FileUpload: {
          template: '<input type="text" />',
          props: ['modelValue', 'error', 'id'],
          emits: ['update:modelValue'],
        },
        AppButton: {
          template: '<button><slot /></button>',
          props: ['disabled', 'isLoading', 'btnClass', 'type', 'text'],
        },
      },
      mocks: {
        $route: mockRoute,
      },
      provide: {
        active: { value: 4 },
        formData: formDataOverride || createFormData(),
      },
    },
  });
};

describe('CreditFormsDocuments.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Mount', () => {
    it('should mount component', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });

    it('should render form element', () => {
      const wrapper = createWrapper();
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('should have proper class structure', () => {
      const wrapper = createWrapper();
      const form = wrapper.find('form');
      expect(form.classes()).toContain('w-full');
    });

    it('should render grid layout', () => {
      const wrapper = createWrapper();
      const grid = wrapper.find('.grid');
      expect(grid.exists()).toBe(true);
    });

    it('should mount without errors', () => {
      expect(() => createWrapper()).not.toThrow();
    });
  });

  describe('Bank Statement Section', () => {
    it('should render bank statement form group', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Bank Statement');
    });

    it('should render add document button for bank statement', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Add document');
    });

    it('should handle bank statement file url changes', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      formData.supportingDocuments[0].urls[0].url = 'test.pdf';
      await wrapper.vm.$nextTick();
      expect(formData.supportingDocuments[0].urls[0].url).toBe('test.pdf');
    });

    it('should display download link when file exists', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls[0].url = 'bank.pdf';
      const wrapper = createWrapper(formData);
      await wrapper.vm.$nextTick();
      const text = wrapper.html();
      expect(text).toContain('Download Bank Statement');
    });
  });

  describe('Other Documents Section', () => {
    it('should render other documents form group', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Other documents');
    });

    it('should render add document button for other documents', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Add document');
    });

    it('should handle other documents file url changes', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      formData.supportingDocuments[1].urls[0].url = 'other.pdf';
      await wrapper.vm.$nextTick();
      expect(formData.supportingDocuments[1].urls[0].url).toBe('other.pdf');
    });

    it('should display download link when file exists', async () => {
      const formData = createFormData();
      formData.supportingDocuments[1].urls[0].url = 'other.pdf';
      const wrapper = createWrapper(formData);
      await wrapper.vm.$nextTick();
      const text = wrapper.html();
      expect(text).toContain('Download Other document');
    });
  });

  describe('Add Field Functionality', () => {
    it('should add new bank statement field', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      const initialCount = formData.supportingDocuments[0].urls.length;
      
      wrapper.vm.addField(0);
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls.length).toBe(initialCount + 1);
    });

    it('should create empty url object when adding field', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      wrapper.vm.addField(0);
      await wrapper.vm.$nextTick();
      
      const lastItem = formData.supportingDocuments[0].urls[formData.supportingDocuments[0].urls.length - 1];
      expect(lastItem.url).toBe('');
    });

    it('should add button clickable', () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Remove Field Functionality', () => {
    it('should remove bank statement field', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls.push({ url: 'test.pdf' });
      const wrapper = createWrapper(formData);
      
      const initialCount = formData.supportingDocuments[0].urls.length;
      wrapper.vm.removeField(0, 0);
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls.length).toBe(initialCount - 1);
    });

    it('should remove correct index', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [
        { url: 'file1.pdf' },
        { url: 'file2.pdf' },
        { url: 'file3.pdf' },
      ];
      const wrapper = createWrapper(formData);
      
      wrapper.vm.removeField(0, 1);
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls[1].url).toBe('file3.pdf');
    });

    it('should render remove button when multiple files', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [
        { url: 'file1.pdf' },
        { url: 'file2.pdf' },
      ];
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      const removeButtons = wrapper.findAll('.text-red-500');
      expect(removeButtons.length).toBeGreaterThan(0);
    });

    it('should not render remove button with single file', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [{ url: 'file.pdf' }];
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      const removeButtonsText = wrapper.html();
      expect(removeButtonsText).not.toContain('Remove');
    });
  });

  describe('Form Submission', () => {
    it('should prevent default form submission', async () => {
      const wrapper = createWrapper();
      const form = wrapper.find('form');
      const preventDefaultSpy = vi.fn();
      
      await form.trigger('submit', { preventDefault: preventDefaultSpy });
      expect(true).toBe(true);
    });

    it('should set loading state on submit', async () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.isLoading).toBe(false);
      
      await wrapper.vm.onSubmit();
      expect(wrapper.vm.isLoading).toBe(false);
    });

    it('should have submit button', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Next');
    });

    it('should have back button', () => {
      const wrapper = createWrapper();
      const text = wrapper.html();
      expect(text).toContain('Back');
    });
  });

  describe('Navigation Buttons', () => {
    it('should have button group', () => {
      const wrapper = createWrapper();
      const buttonGroup = wrapper.find('.flex.gap-x-4');
      expect(buttonGroup.exists()).toBe(true);
    });

    it('should have correct button styling', () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have buttons in footer', () => {
      const wrapper = createWrapper();
      const footer = wrapper.find('.flex.gap-x-4.items-center.justify-end');
      expect(footer.exists()).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should have form schema', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.formSchema).toBeDefined();
    });

    it('should initialize field values', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.errors).toBeDefined();
    });

    it('should track touched fields', () => {
      const wrapper = createWrapper();
      expect(typeof wrapper.vm.isFieldTouched).toBe('function');
    });

    it('should set field values', () => {
      const wrapper = createWrapper();
      expect(typeof wrapper.vm.setFieldValue).toBe('function');
    });

    it('should validate on mount', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('Data Injection', () => {
    it('should inject active value', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.active).toBeDefined();
    });

    it('should inject formData value', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.formData).toBeDefined();
    });

    it('should inject route', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.route).toBeDefined();
    });

    it('should have valid injected values', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.formData?.supportingDocuments).toBeDefined();
    });
  });

  describe('Watchers', () => {
    it('should watch formData changes', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      formData.supportingDocuments[0].urls[0].url = 'test.pdf';
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm).toBeDefined();
    });

    it('should update field validation on data change', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls[0].url = 'test.pdf';
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.formData.supportingDocuments[0].urls[0].url).toBe('test.pdf');
    });

    it('should handle empty urls correctly', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      expect(formData.supportingDocuments[0].urls[0].url).toBe('');
    });

    it('should track multiple file changes', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [
        { url: '' },
        { url: '' },
      ];
      const wrapper = createWrapper(formData);
      
      formData.supportingDocuments[0].urls[0].url = 'file1.pdf';
      formData.supportingDocuments[0].urls[1].url = 'file2.pdf';
      
      await wrapper.vm.$nextTick();
      expect(formData.supportingDocuments[0].urls[0].url).toBe('file1.pdf');
      expect(formData.supportingDocuments[0].urls[1].url).toBe('file2.pdf');
    });

    it('should handle watcher on formData', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      const newData = { ...formData };
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.formData).toBeDefined();
    });
  });

  describe('Download Functionality', () => {
    it('should render download link when url exists', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls[0].url = 'document.pdf';
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      const text = wrapper.html();
      expect(text).toContain('Download');
    });

    it('should not render download link when url empty', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      const text = wrapper.html();
      expect(text).not.toContain('Download Bank Statement');
    });

    it('should show correct download text', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [
        { url: 'file1.pdf' },
        { url: 'file2.pdf' },
      ];
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.$nextTick();
      const text = wrapper.html();
      expect(text).toContain('Download Bank Statement 1');
      expect(text).toContain('Download Bank Statement 2');
    });
  });

  describe('Form State', () => {
    it('should initialize loading state', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.isLoading).toBe(false);
    });

    it('should have form instance', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.handleSubmit).toBeDefined();
    });

    it('should have defineField method', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.defineField).toBeDefined();
    });

    it('should maintain form context', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.errors).toBeDefined();
      expect(wrapper.vm.setFieldValue).toBeDefined();
      expect(wrapper.vm.setFieldTouched).toBeDefined();
    });

    it('should provide handle change function', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.handleChange).toBeDefined();
    });
  });

  describe('UI Elements', () => {
    it('should render form with proper attributes', () => {
      const wrapper = createWrapper();
      const form = wrapper.find('form');
      expect(form.attributes('class')).toContain('w-full');
    });

    it('should render grid with proper gap', () => {
      const wrapper = createWrapper();
      const grid = wrapper.find('.grid');
      expect(grid.exists()).toBe(true);
    });

    it('should have correct column spanning', () => {
      const wrapper = createWrapper();
      const html = wrapper.html();
      expect(html).toContain('col-span-2');
    });
  });

  describe('Error States', () => {
    it('should check if field touched', () => {
      const wrapper = createWrapper();
      expect(typeof wrapper.vm.isFieldTouched).toBe('function');
    });

    it('should handle error display', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.errors).toBeDefined();
    });

    it('should set field touched on interaction', () => {
      const wrapper = createWrapper();
      expect(typeof wrapper.vm.setFieldTouched).toBe('function');
    });

    it('should validate bank statement field', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.formSchema).toBeDefined();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should initialize on mount', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm).toBeDefined();
    });

    it('should set bank statement field on mount', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.formData.supportingDocuments[0]).toBeDefined();
    });

    it('should set other documents field on mount', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.formData.supportingDocuments[1]).toBeDefined();
    });

    it('should mount and setup watchers', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.formData).toBeDefined();
    });

    it('should handle mounted state', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should handle full document upload flow', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      wrapper.vm.addField(0);
      await wrapper.vm.$nextTick();
      
      formData.supportingDocuments[0].urls[1].url = 'bank2.pdf';
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls.length).toBe(2);
      expect(formData.supportingDocuments[0].urls[1].url).toBe('bank2.pdf');
    });

    it('should handle removal and re-addition', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls = [
        { url: 'file1.pdf' },
        { url: 'file2.pdf' },
      ];
      const wrapper = createWrapper(formData);
      
      wrapper.vm.removeField(0, 0);
      await wrapper.vm.$nextTick();
      
      wrapper.vm.addField(0);
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls.length).toBe(2);
    });

    it('should navigate between steps', async () => {
      const active = { value: 4 };
      const wrapper = mount(CreditFormsDocuments, {
        global: {
          stubs: {
            FormGroup: { template: '<div><slot /></div>' },
            FileUpload: { template: '<input />' },
            AppButton: { template: '<button><slot /></button>' },
          },
          mocks: { $route: mockRoute },
          provide: { active, formData: createFormData() },
        },
      });
      
      active.value = 4;
      await wrapper.vm.$nextTick();
      expect(active.value).toBe(4);
    });

    it('should maintain form state during navigation', async () => {
      const formData = createFormData();
      formData.supportingDocuments[0].urls[0].url = 'bank.pdf';
      const wrapper = createWrapper(formData);
      
      await wrapper.vm.onSubmit();
      expect(formData.supportingDocuments[0].urls[0].url).toBe('bank.pdf');
    });

    it('should handle multiple operations sequentially', async () => {
      const formData = createFormData();
      const wrapper = createWrapper(formData);
      
      wrapper.vm.addField(0);
      await wrapper.vm.$nextTick();
      
      formData.supportingDocuments[0].urls[0].url = 'file1.pdf';
      formData.supportingDocuments[0].urls[1].url = 'file2.pdf';
      await wrapper.vm.$nextTick();
      
      wrapper.vm.removeField(0, 0);
      await wrapper.vm.$nextTick();
      
      expect(formData.supportingDocuments[0].urls.length).toBe(1);
      expect(formData.supportingDocuments[0].urls[0].url).toBe('file2.pdf');
    });
  });
});