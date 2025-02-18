import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth");
  const routeName = to?.name?.toString() || "";
  const isAuthRoute = routeName.includes("auth");
  const isLoggedIn = !!mattaAuth.value;
  const businessUserType = mattaAuth.value?.businessUserType;

  if (isLoggedIn) {
   
    if (!businessUserType && to.name !== "user-type") {
      return navigateTo("/user-type");
    }

    // Redirect if user is already on the user-type page or if logged in with businessUserType
    if (to.name === "user-type" && businessUserType) {
      return navigateTo("/");
    }
  }
  if (!isLoggedIn && to.name === "user-type") {
    return navigateTo("/");
  }
  return;
});
