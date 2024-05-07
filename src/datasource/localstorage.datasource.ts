export enum TOKEN {
  auth = "e-biddi_authentication",
  user = "e-biddi_USER",
}

export function getToken(key: TOKEN) {
  return localStorage.getItem(key);
}

export function setToken(key: TOKEN, token: string) {
  localStorage.setItem(key, token);
}

export function removeToken(key: TOKEN) {
  localStorage.removeItem(key);
}
