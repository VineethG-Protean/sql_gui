import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const connectToServerAPI = (
  server_id: string
): Promise<AxiosResponse> => {
  return axios.get(`/api/mysql/stats/connect/${server_id}`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getServerStatsAPI = (
  server_id: string
): Promise<AxiosResponse> => {
  return axios.get(`/api/mysql/stats/${server_id}`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getMysqlUsersAPI = (server_id: string): Promise<AxiosResponse> => {
  return axios.get(`/api/mysql/user/${server_id}/`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const createMysqlUserAPI = (
  data: {
    name: string;
    password: string;
    host: string;
    database: any;
    privileges: any;
  },
  server_id: string
): Promise<AxiosResponse> => {
  return axios.post(`/api/mysql/user/${server_id}`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const dropMysqlUserAPI = (data: {
  server_id: string;
  name: string;
  host: string;
}): Promise<AxiosResponse> => {
  return axios.post(
    `/api/mysql/user/${data.server_id}?name=${data.name}&host=${data.host}`
  );
};

export const getMysqlDatabasesAPI = (
  server_id: string
): Promise<AxiosResponse> => {
  return axios.get(`/api/mysql/database/${server_id}`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getMysqlDatabaseSchemaAPI = (data: {
  server_id: string;
  dbName: string;
}): Promise<AxiosResponse> => {
  return axios.get(
    `/api/mysql/database/${data.server_id}/schema?dbName=${data.dbName}`,
    {
      headers: {
        "x-access-token": getToken().toString(),
      },
    }
  );
};
