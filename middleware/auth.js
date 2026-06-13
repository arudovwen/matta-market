import { getRoute, appUrl } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useEncryptedCookie(AUTH_COOKIE_NAME, defaultOptions);
  const authStore = useAuthStore();
  const allowedCategory = [1, 2];
  const isLoggedIn = !!mattaAuth.value;


  if (!isLoggedIn) {
    return navigateTo(getRoute('login', `${appUrl}${to.fullPath}`), { external: true });
  }
  if (
    isLoggedIn &&
    mattaAuth.value?.userCategory != null &&
    !allowedCategory.includes(mattaAuth.value.userCategory)
  ) {
    authStore.logOut();
    return;
  }

  const disabledRoutes = ["/products", "/storefront"];
  if (
    isLoggedIn &&
    disabledRoutes.some((route) => to.path.startsWith(route))
  ) {
    const onboardingStatus = authStore.userInfo?.onboardingStatus || mattaAuth.value?.onboardingStatus;
    if (onboardingStatus !== 2) {
      return navigateTo("/");
    }
  }

  // if (isLoggedIn) {
  //   const businessUserType = mattaAuth.value.businessUserType;
  //   if (businessUserType !== 0 && businessUserType !== 1) {
  //     // return navigateTo("/user-type");
  //   }
  // }
});
