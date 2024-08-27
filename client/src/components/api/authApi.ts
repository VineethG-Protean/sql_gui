import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

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
  return axiosInstance.post(`/auth/login`, data);
};

export const verifyAPI = (token: string): Promise<AxiosResponse> => {
  return axiosInstance.get(`/auth/verify/${token}`);
}
