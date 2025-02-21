import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth", defaultOptions);
  const isLoggedIn = !!mattaAuth.value;

  // Handle not logged in
  if (!isLoggedIn) {
    handleRouting({ target: "_self" });
  }

  return;
});
