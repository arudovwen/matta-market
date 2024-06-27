import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/vue";
import { it, expect, describe, vi } from "vitest";
import Vuex, { createStore, mapActions } from "vuex";
import DocumentsTable from "~/components/Supplier/requests/DocumentsTable.vue";
import * as reqservices from "~/services/requestservice";

const store = createStore({
  state: {
    loggedUser: {
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    },
  },
  getters: {
    loggedUser: () => ({
      fullName: "Oduro Tolulope",
      phoneNumber: "07036845422",
    }),
  },
});

describe("DocumentsTable", () => {
	vi.spyOn(reqservices, "sellerdoc").mockResolvedValue({
      data: {
        data: {
					data: [
						{
							productName: "Lumefantrine",
							producer: "Some Guy",
							type: "chemical",
							created: new Date()
						},
						{
							productName: "Water",
							producer: "Some Other Guy",
							type: "chemical",
							created: new Date()
						},
					],
					isLoading: false,
					totalData: {},
				},
      },
    }),
  it("renders", async () => {
    const component = render(DocumentsTable, {
      global: {
        plugins: [store],
      },
    });
		expect(screen.getByTestId("spinner")).toBeTruthy();
		await waitForElementToBeRemoved(screen.getByTestId("spinner"))
		.then(() => {
			;
		})
		expect(component.html()).toContain("Lumefantrine")
		expect(component.html()).toContain("")
		component.unmount()
  });
});
