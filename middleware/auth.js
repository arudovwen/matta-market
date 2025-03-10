import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth", defaultOptions);
  const isLoggedIn = !!mattaAuth.value;

  if (!isLoggedIn) {
    handleRouting({ target: "_self" });
    return;
  }
  if (
    authStore.isLoggedIn &&
    !allowedCategory.includes(mattaAuth.value?.userCategory)
  ) {
    authStore.logOut();
    return;
  }

  if (isLoggedIn) {
    const businessUserType = mattaAuth.value.businessUserType;
    if (
      businessUserType !== 0 &&
      businessUserType !== 1 &&
      to.path !== "/checkout"
    ) {
      return navigateTo("/user-type");
    }
  }
});
