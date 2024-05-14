export enum TOKEN {
  auth = "e-biddi_authentication",
  user = "e-biddi_USER",
}

export function getToken(key: TOKEN) {
  return sessionStorage.getItem(key);
}

export function setToken(key: TOKEN, token: string) {
  sessionStorage.setItem(key, token);
}

export function removeToken(key: TOKEN) {
  sessionStorage.removeItem(key);
}
