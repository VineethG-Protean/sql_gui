import axios, { AxiosResponse } from "axios";

export const getToken = (): string => {
  return JSON.stringify(localStorage.getItem("token"));
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const loginAPI = (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse> => {
  return axios.post(`http://localhost:3001/api/auth/login`, data);
};
