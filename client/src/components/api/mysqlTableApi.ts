import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const getMysqlTablesAPI = (): Promise<AxiosResponse> => {
    return axiosInstance.get(`/mysql/table?action=get`);
}

export const createMysqlTableAPI = (data:
    {
        server_id: string,
        databaseName: string,
        tableName: string,
        columns: {
            columnName: string,
            dataType: string,
            constraints: string[],
            key: string
        }[]
    }): Promise<AxiosResponse> => {
    return axiosInstance.post(`/mysql/table?action=add`, data);
}

export const dropMysqlTableAPI = (data:
    {
        server_id: string,
        databasename: string,
        tableName: string
    }): Promise<AxiosResponse> => {
    return axiosInstance.post(`/mysql/table?action=drop`, data)
}

export const alterMysqlTableAPI = (data:
    {
        server_id: string,
        databaseName: string,
        tableName: string,
        alterations:
        {
            type: string,
            columnName: string,
            newColumnName: string,
            dataType: string,
            constraints: string[]
        }[]
    }
): Promise<AxiosResponse> => {
    return axiosInstance.post(`/mysql/table?action=alter`, data)
}