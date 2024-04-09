import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getServerStatsAPI = (id: string): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3000/api/server/stats/${id}`, {
    headers: {
      'x-access-token': getToken().toString()
    }
  });
};
