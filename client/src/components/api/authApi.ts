import axios, { AxiosResponse } from "axios";

export const getToken = (): string => {
  return localStorage.getItem("token") || '';
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  if (localStorage.getItem("token")) return true;
  return false;
}

export const loginAPI = (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse> => {
  return axios.post(`/api/auth/login`, data);
};

export const verifyAPI = (token: string): Promise<AxiosResponse> => {
  return axios.get(`/api/auth/verify/${token}`);
}
