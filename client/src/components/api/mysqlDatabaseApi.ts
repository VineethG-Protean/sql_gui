import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const getMysqlDatabasesAPI = (data: {
  server_id: number;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/database?action=get`, data);
};

export const getMysqlDatabaseInfoAPI = (data: {
  server_id: number;
  databaseName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/database?action=schema`, data);
};

export const getMysqlDatabaseUsersAPI = (data: {
  server_id: number;
  databaseName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/database?action=users`, data);
};

export const createMysqlDatabaseAPI = (data: {
  server_id: number;
  name: string;
  characterSet: string;
  collation: string;
  encryption: string;
  engine: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/database?action=add`, data);
};

export const dropMysqlDatabaseAPI = (data: {
  server_id: number;
  databaseName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/database?action=drop`, data);
}
