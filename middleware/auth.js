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
    if (!mattaAuth.value.businessUserType) {
      // Redirect the user to /user-type if businessUserType is missing
      return navigateTo("/user-type"); // Use next() to redirect to the user-type page
    }
  }

});
