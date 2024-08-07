import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import Top from "~/components/RequestProducts/Top.vue";
import { createStore } from "vuex";

describe("Top", () => {
  it("Mounts without error", async () => {
    const component = render(Top, {
      global: {
        plugins: [
          createStore({
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
          }),
        ],
      },
    });

    expect(screen).toMatchSnapshot();
    component.unmount();
  });
});
