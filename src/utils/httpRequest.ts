import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

const Get = async<T>(path: string, options: object = {}) => {
     const response: AxiosResponse<T> = await axiosClient.get(path, options)
     return response.data
}

export { Get }