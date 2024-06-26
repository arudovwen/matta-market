import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import Top from "~/components/SellChemical/Top.vue";

describe("Top", () => {
  it("Mounts without error", async () => {
    const component = render(Top);
    screen.debug();
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
