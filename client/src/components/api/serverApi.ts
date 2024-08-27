import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const connectToServerAPI = (
  server_id: string
): Promise<AxiosResponse> => {
  return axiosInstance.get(`/mysql/stats/connect/${server_id}`);
};

export const getServerStatsAPI = (
  server_id: string
): Promise<AxiosResponse> => {
  return axiosInstance.get(`/mysql/stats/${server_id}`);
};
