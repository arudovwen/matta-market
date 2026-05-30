export function getClientAppVersion() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("APP_VERSION") ?? 0;
  }
  return 0;
}