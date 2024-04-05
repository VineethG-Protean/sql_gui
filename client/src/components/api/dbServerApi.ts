import axios, { AxiosResponse } from "axios";

export const getDBServerStatusAPI = (): Promise<AxiosResponse> => {
  return axios.get(`http://localhost:3001/api/db_server/stats`);
};
