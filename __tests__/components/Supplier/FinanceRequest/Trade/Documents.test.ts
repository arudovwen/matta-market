import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Documents from "@/components/Supplier/FinanceRequest/Trade/Documents.vue";

vi.mock("~/services/financeservice", () => ({
  addFinance: vi.fn(),
  editFinance: vi.fn(),
}));

vi.mock("~/services/requestservice", () => ({
  deleteDraft: vi.fn(),
  saveAsDraft: vi.fn(),
}));

vi.mock("vue3-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const push = vi.fn();

vi.mock("#app", () => ({
  useRouter: () => ({
    push,
  }),
  useRoute: () => ({
    params: { id: 3 },
  }),
}));

const { addFinance, editFinance } = await import("~/services/financeservice");
const { deleteDraft, saveAsDraft } = await import("~/services/requestservice");
const { toast } = await import("vue3-toastify");

const baseFormData = () => ({
  haveyoudonebusiness: "",
  haveyouexportedtotheothercourty: "",
  supportingDocuments: [
    { urls: [{ url: "a" }] },
    { urls: [{ url: "b" }] },
    { urls: [{ url: "c" }] },
    { urls: [{ url: "d" }] },
  ],
});

const factory = (routeParams = { id: 3 }) => {
  vi.doMock("#app", () => ({
    useRouter: () => ({ push }),
    useRoute: () => ({ params: routeParams }),
  }));

  return mount(Documents, {
    global: {
      stubs: [
        "FormGroup",
        "FileUpload",
        "Textinput",
        "AppButton",
      ],
      provide: {
        active: { value: 1 },
        formData: baseFormData(),
      },
    },
  });
};

describe("Documents.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("addField works", () => {
    const wrapper = factory();
    const initial =
      wrapper.vm.formData.supportingDocuments[0].urls.length;
    wrapper.vm.addField(0);
    expect(
      wrapper.vm.formData.supportingDocuments[0].urls.length
    ).toBe(initial + 1);
  });

  it("removeField works", () => {
    const wrapper = factory();
    wrapper.vm.addField(0);
    const initial =
      wrapper.vm.formData.supportingDocuments[0].urls.length;
    wrapper.vm.removeField(0, 0);
    expect(
      wrapper.vm.formData.supportingDocuments[0].urls.length
    ).toBe(initial - 1);
  });

  it("submit addFinance branch", async () => {
  addFinance.mockResolvedValue({ status: 200 });

  const wrapper = factory({ id: 3 });

  await wrapper.vm.onSubmit({
    haveyoudonebusiness: "yes",
    haveyouexportedtotheothercourty: "yes",
  });

  await flushPromises();

  expect(addFinance).toHaveBeenCalled();
  expect(deleteDraft).toHaveBeenCalled();
});

it("submit error branch", async () => {
  addFinance.mockRejectedValue({
    response: { data: { message: "err" } },
  });

  const wrapper = factory({ id: 3 });

  await wrapper.vm.onSubmit({
    haveyoudonebusiness: "yes",
    haveyouexportedtotheothercourty: "yes",
  });

  await flushPromises();

  expect(toast.error).toHaveBeenCalled();
});

  it("onSaveAndContinue success", async () => {
    saveAsDraft.mockResolvedValue({});

    const wrapper = factory();

    await wrapper.vm.onSaveAndContinue();
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });

  it("onSaveAndContinue error", async () => {
    saveAsDraft.mockRejectedValue({
      response: { data: { message: "err" } },
    });

    const wrapper = factory();

    await wrapper.vm.onSaveAndContinue();
    await flushPromises();

    expect(toast.error).toHaveBeenCalled();
  });

  it("watch updates fields", async () => {
    const wrapper = factory();

    wrapper.vm.formData.supportingDocuments[0].urls[0].url = "";
    wrapper.vm.formData.supportingDocuments[1].urls[0].url = "";

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.errors).toBeDefined();
  });
});