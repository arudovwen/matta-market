import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import FilterBar from "~/components/catalog/FilterBar.vue";
import AdditionalInformation from "~/components/Supplier/AddProduct/AdditionalInformation.vue";

const store = useProductStore();

const form = {
  productQuestions: [],
  tags: [],
  productExperts: [],
};

describe("Content", () => {
  const sortPrice = vi.fn;
  it("should render", () => {
    const component = render(AdditionalInformation, {
      global: {
        provide: {
          form: form,
          toggleNext: vi.fn(),
          togglePreview: vi.fn(),
        },
      },
    });

    component.unmount();
  });
});
