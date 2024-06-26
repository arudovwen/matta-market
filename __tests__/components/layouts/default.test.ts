import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import defaultC from "~/layouts/default.vue";

describe("default", () => {
  it("Mounts without error", async () => {
    const component = render(defaultC);
    screen.debug();
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
