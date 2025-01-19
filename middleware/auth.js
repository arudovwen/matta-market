import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");

  // Not logged in handling
  if (!authStore.isLoggedIn) {
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
  if (authStore.isLoggedIn) {
    if (authStore.userType === undefined) {
      abortNavigation();
      return navigateTo("/user-type");
    } else {
      if (isAuthRoute) {
        return navigateTo("/");
      }
    }
    // Prevent accessing auth routes when logged in
  }
});
