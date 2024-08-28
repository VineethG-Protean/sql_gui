import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const getMysqlTableDataAPI = (data: {
  server_id: number;
  databaseName: string;
  tableName: string;
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table/data?action=get`, data);
};

export const dropMysqlTableDataAPI = (data: {
  server_id: number;
  databaseName: string;
  tableName: string;
  row: {
    name: string;
    value: string | number;
  };
}): Promise<AxiosResponse> => {
  return axiosInstance.post(`/mysql/table/data?action=drop`, data);
};
