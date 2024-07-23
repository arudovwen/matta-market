import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import Faster from "~/components/SellChemical/Faster.vue";

describe("Faster", () => {
  it("Mounts without error", async () => {
    const component = render(Faster);
    
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
