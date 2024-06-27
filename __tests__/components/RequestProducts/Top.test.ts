import { it, expect, describe, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import Top from "~/components/RequestProducts/Top.vue";

describe("Top", () => {
  it("Mounts without error", async () => {
    const component = render(Top);
    
    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
