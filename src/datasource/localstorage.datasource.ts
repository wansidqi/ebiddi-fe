export function getToken(key: string) {
  return localStorage.getItem(key);
}

export function setToken(key: string, token: string) {
  localStorage.setItem(key, token);
}

export function removeToken(key: string) {
  localStorage.removeItem(key);
}
