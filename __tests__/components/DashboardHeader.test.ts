import { fireEvent, render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { it, expect, describe, vi } from "vitest";
import DashboardHeader from "~/components/DashboardHeader.vue";
import { createTestingPinia } from "@pinia/testing";
import * as authServices from "~/services/authservices";

describe("DashboardHeader", () => {
  vi.mock("@/services/notificationservice", () => ({
    getnotification: vi.fn().mockResolvedValue({
      data: {
        bannerUrl: "/images/test-banner.png",
        logo: "/images/test-logo.png",
        storeName: "Test Store",
      },
    }),
  }));

  vi.spyOn(authServices, "logOut").mockReturnValue({
    then: function <TResult1 = void, TResult2 = never>(
      onfulfilled?:
        | ((value: void) => TResult1 | PromiseLike<TResult1>)
        | null
        | undefined,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | null
        | undefined
    ): Promise<TResult1 | TResult2> {
      throw new Error("Function not implemented.");
    },
    catch: function <TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | null
        | undefined
    ): Promise<void | TResult> {
      throw new Error("Function not implemented.");
    },
    finally: function (
      onfinally?: (() => void) | null | undefined
    ): Promise<void> {
      throw new Error("Function not implemented.");
    },
    [Symbol.toStringTag]: "",
  });

  it("renders", async () => {
    const component = render(DashboardHeader, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                loggedUser: {
                  firstName: "Bruce",
                  lastName: "Wayne",
                },
              },
            },
          }),
        ],
        provide: {
          notifications: ref(null),
        },
      },
    });
    expect(screen).toMatchSnapshot();
    await fireEvent.click(screen.getByTestId("myaccount"));
    expect(screen.getByText("My Orders")).toBeTruthy();
    await fireEvent.click(screen.getByText("Sign out"));
    expect(screen.getByText("Yes")).toBeTruthy();
    fireEvent.click(screen.getByText("Yes"));
    expect(authServices.logOut).toBeCalled();
  });
});
