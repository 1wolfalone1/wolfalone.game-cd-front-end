import { Start } from "@mui/icons-material";
import axios from "axios";

const api = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}/authentication`,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
export default api;

export const getData = () => {
   return api.get("/send", {
      headers: {
         Authorization: window.localStorage.getItem("authentication"),
      },
   });
};

export const getLogin = (payload) => {
   return api.post("/oauth2/google", payload, {
      headers: {
         Authorization: `Bearer ${window.localStorage.getItem("authentication")}`,
      },
   });
};
