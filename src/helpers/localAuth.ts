import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export const localAuthenticate = () => {
  const token = getCookie("access_token")?.toString();
  const user = getUser();
  if(token) {
    return {
      isAuthenticated: true,
      token: token,
      user: user
    };
  } else {
    return {
      isAuthenticated: false,
      token: null,
      user: null
    };
  }
};

export const setAccessToken = (token: string) => setCookie("access_token", token, {maxAge: 60 * 60 * 24});
export const setUser = (user: any) => setCookie("user", JSON.stringify(user), {maxAge: 60 * 60 * 24});

export const getAccessToken = () => {
  const token = getCookie("access_token");
  return token && `Bearer ${getCookie("access_token")}`;
};

export const getUser = () => {
  const user = getCookie("user");
  return user ? JSON.parse(user) : null;
};

export const removeAccessToken = () => {
  return deleteCookie("access_token");
};

export const deleteUser = () => {
  return deleteCookie("user");
};
