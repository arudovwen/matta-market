import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Request from "~/components/BuyChemical/Request.vue";

describe("Request", () => {
  it("Should render without error", () => {
    const component = render(Request);
    expect(screen).toMatchSnapshot();
  });
});
