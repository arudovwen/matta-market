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
  if (!mattaAuth.value.businessUserType && to.name !== "user-type") {
    return navigateTo("/user-type");
  }

  if (to.name === "user-type" && mattaAuth.value.businessUserType) {
    return navigateTo("/");
  }

  return;
});
