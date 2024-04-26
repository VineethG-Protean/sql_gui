import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getMysqlUsersAPI = (data: {
  server_id: string;
}): Promise<AxiosResponse> => {
  return axios.post(`/api/mysql/user?action=get`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const createMysqlUserAPI = (data: {
  server_id: string;
  name: string;
  password: string;
  host: string;
  database: any;
  privileges: any;
}): Promise<AxiosResponse> => {
  return axios.post(`/api/mysql/user?action=add`, data, {
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
  return axios.post(`/api/mysql/user?action=drop`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};
