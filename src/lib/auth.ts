export const setToken = (token: string) => {
  localStorage.setItem("token", token);

  document.cookie = [
    `token=${token}`,
    "path=/",
    "max-age=2592000",
    "samesite=lax",
  ].join("; ");
};

export const getToken = (): string | null => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("token="));

  if (tokenCookie) {
    return decodeURIComponent(tokenCookie.split("=")[1]);
  }

  return null;
};

export const removeToken = () => {
  localStorage.removeItem("token");

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};