export default defineNuxtRouteMiddleware((to, from) => {

  const authStore = useAuthStore();

  // if token exists and url is /login redirect to homepage
  if (authStore.isLoggedIn && to?.name.includes("auth")) {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!authStore.isLoggedIn && !to?.name.includes("auth")) {
    abortNavigation();
    return navigateTo(`/auth/login?redirected_from=${to.path}`);
  }

  // if (authStore?.isLoggedIn && authStore?.userType?.toLowerCase() === "buyer" && !buyerRoutes.includes(to.name)) {
  //   return navigateTo("/");
  // }
});
