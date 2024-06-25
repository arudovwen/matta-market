import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import register from "~/layouts/register.vue";

describe("register", () => {
  it("Mounts without error", async () => {
    const component = render(register);
    screen.debug();
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
