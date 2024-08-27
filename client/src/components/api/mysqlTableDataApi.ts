import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const getMysqlTableDataAPI = (data: {
    server_id: string
}): Promise<AxiosResponse> => {
    return axiosInstance.get(`/mysql/table/data?action=get`)
}