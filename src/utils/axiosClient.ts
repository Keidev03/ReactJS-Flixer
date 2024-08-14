import axios, { Axios } from "axios";
import config from "../config";

const axiosClient: Axios = axios.create({
     baseURL: config.api.baseURL,
     headers: {
          'Content-Type': 'application/json'
     },
})

axiosClient.interceptors.request.use(async (config) => {
     // console.log('Request URL:', config.url);
     // console.log('Request Params:', config.params);
     return config;
});

axiosClient.interceptors.response.use((response) => {
     if (response && response.data) {
          return response.data;
     }
     return response;
}, (error) => {
     throw error;
});




export default axiosClient