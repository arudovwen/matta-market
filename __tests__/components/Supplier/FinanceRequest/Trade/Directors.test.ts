import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Directors from "@/components/Supplier/FinanceRequest/Trade/Directors.vue";

vi.mock("~/services/settingservices", () => ({
  updateDirectors: vi.fn(),
}));

vi.mock("~/services/requestservice", () => ({
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
  useRoute: () => ({}),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push,
  }),
  useRoute: () => ({}),
}));

const { updateDirectors } = await import("~/services/settingservices");
const { saveAsDraft } = await import("~/services/requestservice");
const { toast } = await import("vue3-toastify");

const factory = () => {
  return mount(Directors, {
    global: {
      stubs: [
        "DirectorsView",
        "AppButton",
        "OnboardingCompanyDirectorForm",
        "OnboardingCompanyDeleteModal",
        "Dialog",
        "DialogPanel",
        "TransitionChild",
        "TransitionRoot",
      ],
      provide: {
        company: {
          value: {
            directors: [{ name: "A" }],
            companyDocuments: [{ urls: [{ url: "a" }] }],
          },
        },
        getCompanyData: vi.fn(),
        formData: {
          supportingDocuments: [{ urls: [""] }],
        },
        active: { value: 1 },
      },
    },
  });
};

describe("OnboardingCompanyDirectors.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens add modal", async () => {
    const wrapper = factory();
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.open).toBe(true);
    expect(wrapper.vm.action).toBe("add");
  });

  it("handleDelete works", async () => {
    const wrapper = factory();
    wrapper.vm.handleDelete(0);
    expect(wrapper.vm.id).toBe(0);
    expect(wrapper.vm.action).toBe("delete");
    expect(wrapper.vm.open).toBe(true);
  });

  it("handleEdit works", async () => {
    const wrapper = factory();
    wrapper.vm.handleEdit(1, { name: "B" });
    expect(wrapper.vm.id).toBe(1);
    expect(wrapper.vm.director).toEqual({ name: "B" });
    expect(wrapper.vm.action).toBe("edit");
    expect(wrapper.vm.open).toBe(true);
  });

  it("onDelete removes director", async () => {
    const wrapper = factory();
    wrapper.vm.id = 0;
    wrapper.vm.onDelete();
    expect(wrapper.vm.form.directors.length).toBe(0);
    expect(wrapper.vm.open).toBe(false);
  });

  it("handleSubmit success", async () => {
    saveAsDraft.mockResolvedValue({});
    updateDirectors.mockResolvedValue({ status: 200 });

    const wrapper = factory();
    await wrapper.vm.handleSubmit();
    await flushPromises();

    expect(saveAsDraft).toHaveBeenCalled();
    expect(updateDirectors).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });

  it("handleSubmit error", async () => {
    saveAsDraft.mockRejectedValue({
      response: { data: { message: "err" } },
    });

    const wrapper = factory();
    await wrapper.vm.handleSubmit();
    await flushPromises();

    expect(toast.error).toHaveBeenCalled();
  });

  it("handleSubmit returns if no directors", async () => {
    const wrapper = factory();
    wrapper.vm.form.directors = [];
    await wrapper.vm.handleSubmit();
    expect(saveAsDraft).not.toHaveBeenCalled();
  });

  it("onSaveAndContinue success", async () => {
  saveAsDraft.mockResolvedValue({});
  updateDirectors.mockResolvedValue({});

  const wrapper = factory();

  await wrapper.vm.onSaveAndContinue();
  await flushPromises();

  expect(saveAsDraft).toHaveBeenCalled();
  expect(updateDirectors).toHaveBeenCalled();
  expect(toast.success).toHaveBeenCalledWith("Draft saved successfully");
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
});