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
