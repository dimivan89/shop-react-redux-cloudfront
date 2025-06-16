export const setAuthorizationToken = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem("authorization_token", token);
};

export const getAuthorizationHeader = () => {
  const token = localStorage.getItem("authorization_token");
  return token ? { Authorization: `Basic ${token}` } : {};
};
