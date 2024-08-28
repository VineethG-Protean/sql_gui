import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axiosInstance";

export const getMysqlUsersAPI = (data: {
  server_id: number;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/user?action=get`, data);
};

export const createMysqlUserAPI = (data: {
  server_id: number;
  name: string;
  password: string;
  host: string;
  database: string;
  privileges: string[];
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/user?action=add`, data);
};

export const dropMysqlUserAPI = (data: {
  server_id: number;
  name: string;
  host: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/user?action=drop`, data);
};
