import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import ShippingForm from "~/components/Supplier/shipping/ShippingForm.vue";
import { loginUser } from "~/services/authservices";
import { toast } from "vue3-toastify";

vi.mock("~/services/authservices", () => ({
  loginUser: vi.fn(),
}));

vi.mock("vue3-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

const mockCommit = vi.fn();
vi.mock("vuex", () => ({
  useStore: () => ({
    commit: mockCommit,
  }),
}));

const { mockNavigateTo, mockRoute } = vi.hoisted(() => ({
  mockNavigateTo: vi.fn(),
  mockRoute: { query: {} }
}));

vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

vi.mock("#app", () => ({
  navigateTo: mockNavigateTo,
  useRoute: () => mockRoute,
}));
vi.mock("#imports", () => ({
  navigateTo: mockNavigateTo,
}));
vi.stubGlobal("navigateTo", mockNavigateTo);

/** Fill all required fields using stable IDs / attributes */
async function fillForm(wrapper) {
  await wrapper.find("#firstName").setValue("John");
  await wrapper.find("#lastName").setValue("Doe");
  await wrapper.find("#street").setValue("Main Street");
  await wrapper.find("#city").setValue("Lagos");
  const select = wrapper.find(".select-input");
  if (select.exists()) await select.setValue("Nigeria");
  
  // ensure vue processes these updates
  await flushPromises();
  console.log("FORM AFTER FILL:", wrapper.vm.v$.$model);
}

describe("ShippingForm.vue", () => {
  let wrapper;
  const originalLocation = window.location;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigateTo.mockClear();
    mockRoute.query = {};

    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });

    wrapper = mount(ShippingForm, {
      global: {
        stubs: {
          CountriesSelect: {
            template:
              '<select class="select-input" :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option value="Nigeria">Nigeria</option></select>',
            props: ["modelValue"],
          },
        },
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    });
  });

  it("prevents submission when validation fails", async () => {
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(loginUser).not.toHaveBeenCalled();
    expect(wrapper.findAll(".error-msg").length).toBeGreaterThan(0);
  });

  it("handles successful submission with redirected_from", async () => {
    mockRoute.query.redirected_from = "/cart";
    loginUser.mockResolvedValue({
      status: 200,
      data: { data: { name: "Test User" } },
    });

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(mockCommit).toHaveBeenCalledWith("setUser", { name: "Test User" });
    expect(toast.info).toHaveBeenCalledWith("Login successful");
    expect(mockNavigateTo).toHaveBeenCalledWith("/cart");
  });

  it("handles successful submission with redirect_to", async () => {
    mockRoute.query.redirect_to = "/checkout";
    loginUser.mockResolvedValue({
      status: 200,
      data: { data: {} },
    });

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(mockNavigateTo).toHaveBeenCalledWith("/checkout");
  });

  it("handles successful submission with no redirect query", async () => {
    loginUser.mockResolvedValue({
      status: 200,
      data: { data: {} },
    });

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(mockNavigateTo).toHaveBeenCalledWith("/");
  });

  it("handles submission error with lowercase message", async () => {
    const errorMsg = "Invalid details";
    loginUser.mockRejectedValue({
      response: { data: { message: errorMsg } },
    });

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(toast.error).toHaveBeenCalledWith(errorMsg);
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("handles submission error with PascalCase Message", async () => {
    const errorMsg = "Server Error";
    loginUser.mockRejectedValue({
      response: { data: { Message: errorMsg } },
    });

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(toast.error).toHaveBeenCalledWith(errorMsg);
  });

  it("triggers validation error for maxLength", async () => {
    await wrapper.find("#firstName").setValue("a".repeat(51));
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(wrapper.find(".error-msg").exists()).toBe(true);
  });

  it("toggles checkbox and check button existence", async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked(true);
    expect(checkbox.element.checked).toBe(true);

    const cancelBtn = wrapper.find("button.hover\\:bg-gray-50");
    expect(cancelBtn.exists()).toBe(true);
  });
});