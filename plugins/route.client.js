function getClientAppVersion() {
  return localStorage.getItem("APP_VERSION") ?? 0;
}

function setClientAppVersion(version) {
  return localStorage.setItem("APP_VERSION", version);
}
async function clearCookies() {
  const cookies = await cookieStore.getAll();

  if (cookies.length > 0) {
    console.log("Deleting cookies:", cookies);

    // Delete each cookie
    for (const cookie of cookies) {
      await cookieStore.delete(cookie.name, {
        path: cookie.path,
        domain: cookie.domain,
      });
    }

    console.log("Cookies deleted successfully");
  } else {
    console.log("No cookies found");
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.afterEach((to, from) => {
    fetch("/version.json").then((serverPromise) =>
      serverPromise.json().then((response) => {
        const latestVersion = response.version;
        const clientStoredVersion = getClientAppVersion();

        if (clientStoredVersion != latestVersion) {
          clearCookies();
          localStorage.clear()
          setClientAppVersion(latestVersion);
          window.location.reload(true);
        } else return;
      })
    );
  });
});
