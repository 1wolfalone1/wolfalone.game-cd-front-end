import axios from "axios";
import { LOCAL_URL } from './apiConfig';
import qs  from "qs";

export const apid = axios.create({
   baseURL: `${LOCAL_URL}`,
   withCredentials: true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
apid.defaults.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'})
apid.interceptors.request.use(
   (config) => {
      if (!config.headers.Authorization) {
         const token = JSON.parse(localStorage.getItem("user"));
         if (token) {
            config.headers.Authorization = `Bearer ${token.token}`;
         }
      }

      return config;
   },
   (error) => Promise.reject(error)
);
