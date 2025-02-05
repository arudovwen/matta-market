import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth");
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");
  const isLoggedIn = !!mattaAuth.value;

  // Not logged in handling
  if (!isLoggedIn) {
    if (isAuthRoute) {
      abortNavigation();
      await handleRouting();
      return;
    }
    // Redirect non-auth routes to login with return path
    abortNavigation();
    return navigateTo(`/auth/login?redirected_from=${to.path}`);
  }

  // Logged in handling
  if (isLoggedIn) {
    if (mattaAuth.value.businessUserType === undefined) {
      abortNavigation();
      return navigateTo("/user-type");
    }
    if (isAuthRoute) {
      return navigateTo("/");
    }

    // Prevent accessing auth routes when logged in
  }
});
