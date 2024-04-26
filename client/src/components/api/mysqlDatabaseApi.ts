import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getMysqlDatabasesAPI = (data: {
  server_id: string;
}): Promise<AxiosResponse> => {
  return axios.post(`/api/mysql/database?action=get`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getMysqlDatabaseSchemaAPI = (data: {
  server_id: string;
  dbName: string;
}): Promise<AxiosResponse> => {
  return axios.post(`/api/mysql/database?action=schema`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};
