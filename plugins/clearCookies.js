export default defineNuxtPlugin(() => {
  return {
    provide: {
      clearCookies: async function () {
        if (!('cookieStore' in window)) {
          console.error("cookieStore API is not supported in this environment.");
          return;
        }

        const cookies = await cookieStore.getAll();

        if (cookies.length > 0) {


          // Delete each cookie
          for (const cookie of cookies) {
            await cookieStore.delete(cookie.name, {
              path: cookie.path,
              domain: cookie.domain,
            });
          }


        } else {

        }
      }
    }
  };
});
