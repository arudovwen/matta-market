import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, reactive, computed } from "vue";
import LoanRequest from "@/components/Supplier/FinanceRequest/Trade/LoanRequest.vue";
import { saveAsDraft } from "@/services/requestservice.js";

const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/services/requestservice.js", () => ({
  saveAsDraft: vi.fn(),
}));

const mockFormValues = {
  amountRequired: null,
  tenor: "",
  whereDidYouHearAboutUs: "",
};

const mockErrors = reactive({
  amountRequired: undefined,
  tenor: undefined,
  whereDidYouHearAboutUs: undefined,
});

const mockValues = ref({ ...mockFormValues });

vi.mock("vee-validate", () => ({
  useForm: () => ({
    handleSubmit: (fn) => async (e) => {
      mockErrors.amountRequired = undefined;
      mockErrors.tenor = undefined;
      
      if (!mockValues.value.amountRequired || mockValues.value.amountRequired < 100) {
        mockErrors.amountRequired = "Minimum amount is 100 naira";
      }
      if (!mockValues.value.tenor) {
        mockErrors.tenor = "Tenor is required";
      }

      const hasErrors = Object.values(mockErrors).some(err => err !== undefined);
      if (!hasErrors) {
        return await fn(mockValues.value);
      }
    },
    defineField: (name) => [
      computed({
        get: () => mockValues.value[name],
        set: (val) => {
          mockValues.value[name] = val;
        },
      }),
      computed(() => ({ error: mockErrors[name] })),
    ],
    errors: mockErrors,
    setFieldValue: (field, val) => {
      mockValues.value[field] = val;
    },
    setValues: (newValues) => {
      Object.assign(mockValues.value, newValues);
    },
    values: mockValues.value,
  }),
}));

describe("LoanRequest.vue", () => {
  let wrapper;
  let active;
  let formData;

  beforeEach(() => {
    vi.clearAllMocks();
    mockValues.value = { ...mockFormValues };
    mockErrors.amountRequired = undefined;
    mockErrors.tenor = undefined;
    mockErrors.whereDidYouHearAboutUs = undefined;

    active = ref(1);
    formData = reactive({
      amountRequired: 500,
      tenor: "30",
      whereDidYouHearAboutUs: "Social Media",
      supportingDocuments: [
        {
          urls: [{ url: "" }],
        },
      ],
    });

    wrapper = mount(LoanRequest, {
      global: {
        stubs: {
          FormGroup: true,
          CurrencyInput: true,
          Select: true,
          Textinput: true,
          AppButton: true,
        },
        provide: {
          active,
          formData,
        },
      },
    });
  });

  it("renders form", () => {
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("submits form with valid data", async () => {
    saveAsDraft.mockResolvedValue({});
    
    mockValues.value.amountRequired = 5000;
    mockValues.value.tenor = "14";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
    expect(active.value).toBe(2);
  });

  it("prevents submission with low amount", async () => {
    mockValues.value.amountRequired = 50;
    mockValues.value.tenor = "7";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(mockErrors.amountRequired).toBe("Minimum amount is 100 naira");
    expect(saveAsDraft).not.toHaveBeenCalled();
  });

  it("prevents submission without tenor", async () => {
    mockValues.value.amountRequired = 1000;
    mockValues.value.tenor = "";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(mockErrors.tenor).toBe("Tenor is required");
    expect(saveAsDraft).not.toHaveBeenCalled();
  });

  it("handles submission failure", async () => {
    saveAsDraft.mockRejectedValue(new Error("Failed"));
    
    mockValues.value.amountRequired = 1000;
    mockValues.value.tenor = "7";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
    expect(active.value).toBe(1);
  });

  it("handles save draft failure without navigation", async () => {
    saveAsDraft.mockRejectedValue(new Error("Draft Error"));
    
    const buttons = wrapper.findAll("button");
    const saveDraftBtn = buttons.find((btn) => btn.text() === "Save as Draft");
    
    await saveDraftBtn.trigger("click");
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("updates form data on submission", async () => {
    saveAsDraft.mockResolvedValue({});
    
    mockValues.value.amountRequired = 3500;
    mockValues.value.tenor = "14";
    mockValues.value.whereDidYouHearAboutUs = "Referral";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(formData.amountRequired).toBe(3500);
    expect(formData.tenor).toBe("14");
    expect(formData.whereDidYouHearAboutUs).toBe("Referral");
  });

  it("handles documents with existing content", async () => {
    formData.supportingDocuments[0].urls[0] = "http://doc.url";
    saveAsDraft.mockResolvedValue({});
    
    mockValues.value.amountRequired = 2000;
    mockValues.value.tenor = "60";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
  });

  it("clears empty documents on draft save", async () => {
    formData.supportingDocuments[0].urls[0] = "";
    saveAsDraft.mockResolvedValue({});
    
    const buttons = wrapper.findAll("button");
    const saveDraftBtn = buttons.find((btn) => btn.text() === "Save as Draft");
    
    await saveDraftBtn.trigger("click");
    await flushPromises();

    expect(formData.supportingDocuments).toEqual([]);
  });

  it("allows optional whereDidYouHearAboutUs", async () => {
    saveAsDraft.mockResolvedValue({});
    
    mockValues.value.amountRequired = 1500;
    mockValues.value.tenor = "30";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
  });

  it("validates both amount and tenor together", async () => {
    mockValues.value.amountRequired = 50;
    mockValues.value.tenor = "";
    
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(mockErrors.amountRequired).toBe("Minimum amount is 100 naira");
    expect(mockErrors.tenor).toBe("Tenor is required");
    expect(saveAsDraft).not.toHaveBeenCalled();
  });
});