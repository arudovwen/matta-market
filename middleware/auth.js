export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");

  // Single source of truth for validation URL
  const validationUrl = `http${
    process.env.NODE_ENV === "production"
      ? "s://dev.profile.matta.trade"
      : "://localhost:3020"
  }`;

  // Not logged in handling
  if (!authStore.isLoggedIn) {
    if (isAuthRoute) {
      abortNavigation();
      await navigateTo(`${validationUrl}/subapp/validate/0?app=0`, {
        external: true,
      });
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
