import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const connectToServerAPI = (id: string): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/stats/connect/${id}`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getServerStatsAPI = (id: string): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/stats/${id}`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const getMysqlUsersAPI = (id: string): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/global/${id}/users`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

export const createMysqlUserAPI = (data: {
  id: string;
  name: string;
  password: string;
  host: string;
  database: any;
  privileges: any;
}): Promise<AxiosResponse> => {
  return axios.post(`http://localhost:3000/api/global/user`, data, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};

// export const dropMysqlUserAPI = (): Promise<AxiosResponse> => {};

export const getMysqlDatabasesAPI = (id: string): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/global/${id}/databases`, {
    headers: {
      "x-access-token": getToken().toString(),
    },
  });
};
