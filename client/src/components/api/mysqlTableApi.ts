import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const getMysqlTablesAPI = (data: {
  server_id: string;
  databaseName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table?action=get`, data);
};

export const getMysqlTableInfoAPI = (data: {
  server_id: string;
  databaseName: string;
  tableName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table?action=schema`, data);
};

export const createMysqlTableAPI = (data: {
  server_id: string;
  databaseName: string;
  tableName: string;
  columns: {
    columnName: string;
    dataType: string;
    constraints: string[];
    key: string;
  }[];
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table?action=add`, data);
};

export const dropMysqlTableAPI = (data: {
  server_id: string;
  databasename: string;
  tableName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table?action=drop`, data);
};

export const alterMysqlTableAPI = (data: {
  server_id: string;
  databaseName: string;
  tableName: string;
  alterations: {
    type: string;
    columnName: string;
    newColumnName: string;
    dataType: string;
    constraints: string[];
  }[];
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table?action=alter`, data);
};
