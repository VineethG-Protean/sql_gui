import { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axiosInstance";

export const getAllUsersAPI = async (): Promise<AxiosResponse> => {
  return axiosInstance.get(`/admin/users`);
};

export const inviteUserAPI = async (data: {
  email: string;
  username: string;
  password: string;
  name: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/admin/user/invite`, data);
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
  return axiosInstance.put(`/admin/user`, data);
};

export const deleteUserAPI = async (id: number): Promise<AxiosResponse> => {
  return axiosInstance.delete(`/admin/user/${id}`);
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
  return axiosInstance.post(`/admin/server`, data);
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
  return axiosInstance.put(`/admin/server`, data);
};

export const deleteServerAPI = async (id: number): Promise<AxiosResponse> => {
  return axiosInstance.delete(`/admin/server/${id}`);
};
