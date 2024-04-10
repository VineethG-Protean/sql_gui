import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getUserProfile = (): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/user`, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const getAllServersAPI = async (): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/user/servers`, {
    headers: { "x-access-token": getToken().toString() },
  });
};
