import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getAllUsersAPI = async (): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/admin/users`, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const inviteUserAPI = async (data: {
  email: string;
  username: string;
  password: string;
  name: string;
}): Promise<AxiosResponse> => {
  return axios.post(`http://localhost:3000/api/admin/user/invite`, data, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const updateUserAPI = async (data: {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
}): Promise<AxiosResponse> => {
  return axios.put(`http://localhost:3000/api/admin/user`, data, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const deleteUserAPI = async (id: number): Promise<AxiosResponse> => {
  return axios.delete(`http://localhost:3000/api/admin/user/${id}`, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const addServerAPI = async (data: {
  name: string;
  protocol: string;
  host: string;
  port: string;
  username: string;
  password: string;
  type: string;
}): Promise<AxiosResponse> => {
  return axios.post(`http://localhost:3000/api/admin/server`, data, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const updateServerAPI = async (data: {
  id: string;
  name: string;
  protocol: string;
  host: string;
  port: string;
  username: string;
  password: string;
  type: string;
}): Promise<AxiosResponse> => {
  return axios.put(`http://localhost:3000/api/admin/server`, data, {
    headers: { "x-access-token": getToken().toString() },
  });
};

export const deleteServerAPI = async (id: number): Promise<AxiosResponse> => {
  return axios.delete(`http://localhost:3000/api/admin/server/${id}`, {
    headers: { "x-access-token": getToken().toString() },
  });
};
