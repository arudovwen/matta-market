export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");


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
