import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const getAllUsersAPI = async (): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:3000/api/admin/users`, { headers: { 'x-access-token': getToken().toString() } })
}

export const inviteUserAPI = async (data: { email: string, username: string, password: string, name: string }): Promise<AxiosResponse> => {
    return axios.post(`http://localhost:3000/api/admin/user/invite`, data, { headers: { 'x-access-token': getToken().toString() } });
}

export const getAllServersAPI = async (): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:3000/api/admin/servers`, { headers: { 'x-access-token': getToken().toString() } });
}

export const addServerAPI = async (data: {
    host: string, port: number, username: string, password: string, type: string
}): Promise<AxiosResponse> => {
    return axios.post(`http://localhost:3000/api/admin/server`, data, { headers: { 'x-access-token': getToken().toString() } });
}

