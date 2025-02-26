import { handleRouting } from "~/utils/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const mattaAuth = useCookie("mattaAuth", defaultOptions);
  const isLoggedIn = !!mattaAuth.value;

  // Handle not logged in
  if (!isLoggedIn) {
    // Redirect using the handleRouting function to open a new window or continue in the same window.
    handleRouting({ target: "_self" });
    return; // Stop further processing
  }

  // Handle businessUserType check if logged in
  if (isLoggedIn) {
    const businessUserType = mattaAuth.value.businessUserType;
  
    // Check if businessUserType is not 0 or 1
    if (businessUserType !== 0 && businessUserType !== 1 && to.path !== '/checkout') {
      return navigateTo("/user-type"); // Redirect to /user-type page
    }
  }
  
});
