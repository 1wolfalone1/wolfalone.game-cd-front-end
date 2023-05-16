import { Start } from "@mui/icons-material";
import axios from "axios";
const api = axios.create({
   baseURL: "http://localhost:3005/api/v1/authentication",
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});
export default api;

export const getData = () => {
   return api.get("/api/v1/authentication/send");
};

export const getLogin = (payload) => {
   return api.post(
      "/oauth2/google", payload
   );
};
