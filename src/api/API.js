import axios from "axios";
import { LOCAL_URL } from "./apiConfig";
import qs from "qs";

export const apid = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}`,
   withCredentials: true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
apid.defaults.paramsSerializer = (params) =>
   qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
   });
apid.interceptors.request.use(
   (config) => {
      if (!config.headers.Authorization) {
         const token = JSON.parse(localStorage.getItem("user"));
         if (token) {
            config.headers.Authorization = `Bearer ${token.token}`;
         }
      }
      console.log(config);
      console.log(config);
      console.log(config.baseURL);

      return config;
   },
   (error) => Promise.reject(error)
);
apid.interceptors.response.use(
   (response) => {
      console.log(response);
      // Edit response config
      return response;
   },
   (error) => {
      console.log(error);
      // if (error.response.status === 403) {
      //    window.location.href = "/login?auth=403";
      // } else if (error.response.status === 406) {
      //    window.location.href = "/login?auth=406";
      // }
   }
);
