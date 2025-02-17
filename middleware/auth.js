import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth");
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");
  const isLoggedIn = !!mattaAuth.value;

  // Not logged in handling
  if (!isLoggedIn) {
    if (isAuthRoute) {
      return handleRouting();
    }
  }

  // Route based on user type
  if (
    !mattaAuth.value?.businessUserType &&
    to.name !== "user-type" &&
    isLoggedIn
  ) {
    return navigateTo("/user-type");
  }

  if (
    (!isLoggedIn && to.name === "user-type") ||
    (isLoggedIn && mattaAuth.value?.businessUserType)
  ) {
    return navigateTo("/");
  }

  return;
});
