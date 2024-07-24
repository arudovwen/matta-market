import { it, expect, describe, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { provide, ref } from "vue";
import IndexQuoteForm from "~/components/Information/quote/IndexQuote.vue";

describe("IndexQuoteForm", () => {
  let handleSubmit;
  let toggleNext;
  let quoteForm;

  beforeEach(() => {
    // Mock dependencies
    handleSubmit = vi.fn();
    toggleNext = vi.fn();
    quoteForm = {
      sellerId: "56789098",
      productId: "6545678",
      productName: "Bruce Wayne",
      producerId: "56786",
      producer: "Builder",
      buyerBusinessName: "Mock Company",
      requestedBy: "John Doe",
      sellerName: "Mock Supplier",
      market: "",
      productUse: "",
      expectedVolume: 0,
      unit: "kg",
      deliverAddress: "",
      contactPhone: "",
      additionalInformation: "",
      phoneCode: "+234",
      phone: null,
      package: null,
      applications: "",
    };

    // Render the component with necessary providers
    render(IndexQuoteForm, {
      global: {
        provide: {
          product: ref({
            supplierId: "56789098",
            id: "6545678",
            gallery: [""],
            name: "Bruce Wayne",
            producer: {
              id: "56786",
              title: "Builder",
            },
          }),
          handleSubmit,
          toggleNext,
          quoteForm: ref(quoteForm),
          active: ref(1),
          isOpen: ref(false),
          emit: vi.fn(),
          authStore: {
            isLoggedIn: false, // Mocked authStore
          },
        },
      },
    });
  });

  it("renders initial state correctly", async () => {
    // Assert that the form elements are rendered correctly
    expect(screen.getByText("Step 1/3")).toBeTruthy();
    expect(screen.getByText("Bruce Wayne")).toBeTruthy();
    expect(screen.getByText("Step 1/3")).toBeTruthy();
    expect(screen.getAllByTestId("step-header")).toHaveLength(1); // Only one step header should be present initially
  });

  // it("handles navigation to the next step correctly", async () => {
  //   // Simulate filling out the form
  //   fireEvent.input(screen.getByPlaceholderText("Market"), {
  //     target: { value: "Mock Market" },
  //   });

  //   fireEvent.input(screen.getByPlaceholderText("Product Use"), {
  //     target: { value: "Mock Use" },
  //   });

  //   fireEvent.input(screen.getByPlaceholderText("Expected Volume"), {
  //     target: { value: "100" },
  //   });

  //   // Simulate clicking the Next button
  //   fireEvent.click(screen.getByText("Next"));

  //   // Assert that toggleNext is called to navigate to the next step
  //   expect(toggleNext).toHaveBeenCalled();
  // });
});
