import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth_Dev", defaultOptions);
  const authStore = useAuthStore();
  const allowedCategory = [1, 2];
  const isLoggedIn = !!mattaAuth.value;

  if (!isLoggedIn) {
   handleRouting('login')
    return;
  }
  if (
    isLoggedIn &&
    mattaAuth.value?.userCategory != null &&
    !allowedCategory.includes(mattaAuth.value.userCategory)
  ) {
    authStore.logOut();
    return;
  }

  if (isLoggedIn) {
    const businessUserType = mattaAuth.value.businessUserType;
    if (businessUserType !== 0 && businessUserType !== 1) {
      return navigateTo("/user-type");
    }
  }
});
