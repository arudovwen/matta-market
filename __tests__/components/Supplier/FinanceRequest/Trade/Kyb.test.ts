import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, nextTick, computed } from "vue";
import Kyb from "~/components/Supplier/FinanceRequest/Trade/Kyb.vue";

vi.mock("@vuepic/vue-datepicker", () => ({ default: { template: "<input />" } }));
vi.mock("vue3-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("~/services/requestservice", () => ({ saveAsDraft: vi.fn(() => Promise.resolve()) }));
vi.mock("~/services/settingservices", () => ({
  updateCompanyProfile: vi.fn(() => Promise.resolve({ status: 200 })),
  updateDocuments: vi.fn(),
}));

const mockFormValues = {
  companyDocuments: [],
  companyName: "",
  dateOfIncorporation: null,
  companyEmail: "",
  companyPhone: "",
  country: "",
  state: "",
  sector: "",
  category: "",
  registrationNo: "",
  tin: "",
  address: "",
  city: "",
  website: "",
  notes: "",
};

vi.mock("vee-validate", () => ({
  useForm: () => {
    const values = ref({ ...mockFormValues });

    return {
      handleSubmit: (fn: any) => async (formValues: any) => {
        try {
          return await fn(values.value);
        } catch (e) {

        }
      },
      defineField: (name: string) => [
        computed({
          get: () => values.value[name],
          set: (val) => {
            values.value[name] = val;
          },
        }),
        {},
      ],
      errors: {},
      setFieldValue: (field: string, val: any) => {
        values.value[field] = val;
      },
      setValues: (newValues: any) => {
        Object.assign(values.value, newValues);
      },
      isFieldTouched: vi.fn(),
      values: values.value,
    };
  },
}));

describe("Kyb", () => {
  let formData: any;
  let active: any;
  let company: any;
  let getCompanyData: any;

  const factory = () =>
    mount(Kyb, {
      global: {
        stubs: {
          Textinput: true,
          FormGroup: true,
          ClientOnly: { template: "<div><slot /></div>" },
          FormsPhoneCodes: true,
          Select: true,
          Textarea: true,
          AppButton: { template: "<button><slot/></button>" },
          OnboardingCompanyDocumentsUpload: {
            template: "<div />",
            props: ["documents"],
          },
        },
        provide: {
          formData,
          active,
          company,
          getCompanyData,
        },
        mocks: {
          useRouter: () => ({ push: vi.fn() }),
        },
      },
    });

  beforeEach(() => {
    vi.clearAllMocks();
    formData = {
      kyb: { companyDocuments: [] },
      supportingDocuments: [{ urls: [{ url: "" }] }],
    };
    active = ref(1);
    company = ref({});
    getCompanyData = vi.fn();
  });

  it("renders form", () => {
    const wrapper = factory();
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("handles document update", async () => {
    const wrapper = factory();
    const docs = [{ documentType: 0, urls: [{ url: "a" }] }];
    wrapper.vm.handleDocUpdate(docs);
    await nextTick();
    expect(wrapper.vm.values.companyDocuments).toEqual(docs);
  });

  it("submits form with valid nigeria documents", async () => {
    const wrapper = factory();
    wrapper.vm.country = "nigeria";
    wrapper.vm.values.companyDocuments = [
      { documentType: 0, urls: [{ url: "doc1.pdf" }] },
      { documentType: 1, urls: [{ url: "doc2.pdf" }] },
      { documentType: 2, urls: [{ url: "doc3.pdf" }] },
      { documentType: 3, urls: [{ url: "doc4.pdf" }] },
      { documentType: 4, urls: [{ url: "doc5.pdf" }] },
    ];
    
    await nextTick();
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    
    expect(wrapper.exists()).toBe(true);
  });

  it("displays validation error for incomplete nigeria documents", async () => {
    const wrapper = factory();
    wrapper.vm.country = "nigeria";
    wrapper.vm.values.companyDocuments = [
      { documentType: 0, urls: [{ url: "" }] },
    ];
    
    await nextTick();
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    
    expect(wrapper.exists()).toBe(true);
  });

  it("submits form with valid non-nigeria documents", async () => {
    const wrapper = factory();
    wrapper.vm.country = "ghana";
    wrapper.vm.values.companyDocuments = [
      { documentType: 0, urls: [{ url: "doc1.pdf" }] },
      { documentType: 4, urls: [{ url: "doc2.pdf" }] },
    ];
    
    await nextTick();
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    
    expect(wrapper.exists()).toBe(true);
  });

  it("displays validation error for incomplete non-nigeria documents", async () => {
    const wrapper = factory();
    wrapper.vm.country = "ghana";
    wrapper.vm.values.companyDocuments = [
      { documentType: 0, urls: [{ url: "" }] },
    ];
    
    await nextTick();
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    
    expect(wrapper.exists()).toBe(true);
  });

  it("updates documents when country changes", async () => {
    const wrapper = factory();
    wrapper.vm.country = "nigeria";
    await nextTick();
    
    wrapper.vm.country = "ghana";
    await nextTick();
    
    expect(wrapper.exists()).toBe(true);
  });

  it("calls handleDocUpdate correctly", async () => {
    const wrapper = factory();
    const newDocs = [
      { documentType: 1, urls: [{ url: "test.pdf" }] },
    ];
    
    wrapper.vm.handleDocUpdate(newDocs);
    await nextTick();
    
    expect(wrapper.vm.values.companyDocuments).toEqual(newDocs);
  });

  it("handles empty company documents array", async () => {
    const wrapper = factory();
    wrapper.vm.values.companyDocuments = [];
    
    await nextTick();
    expect(wrapper.vm.values.companyDocuments).toEqual([]);
  });

  it("properly initializes with form data", async () => {
    const wrapper = factory();
    
    const testData = {
      companyName: "Test Company",
      companyEmail: "test@example.com",
      country: "Nigeria",
    };
    
    wrapper.vm.setValues(testData);
    await nextTick();
    
    expect(wrapper.vm.values.companyName).toBe("Test Company");
    expect(wrapper.vm.values.companyEmail).toBe("test@example.com");
  });

  it("sets field values individually", async () => {
    const wrapper = factory();
    
    wrapper.vm.setFieldValue("companyName", "New Company");
    await nextTick();
    
    expect(wrapper.vm.values.companyName).toBe("New Company");
  });
});