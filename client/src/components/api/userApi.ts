import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axiosInstance";

export const getUserProfile = (): Promise<AxiosResponse> => {
  return axiosInstance.get(`/user`);
};

export const getAllServersAPI = async (): Promise<AxiosResponse> => {
  return axiosInstance.get(`/user/servers`);
};
