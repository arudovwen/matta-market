export function setClientAppVersion(version) {
  if (typeof window !== 'undefined') {
    return localStorage.setItem("APP_VERSION", version);
  }
}