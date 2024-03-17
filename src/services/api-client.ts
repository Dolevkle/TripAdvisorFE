import axios, { CanceledError } from "axios";
import { refresh } from "./user-service";

export { CanceledError };
const apiClient = axios.create({
  //baseURL: 'https://10.10.248.100',
  baseURL: "http://localhost:3000",
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      //place your reentry code
      const originalRequest = error.config;
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        const res = await refresh(parsedCurrentUser.refreshToken);
        axios.defaults.headers.common["Authorization"] =
          `JWT ${res.accessToken}`;
        return apiClient(originalRequest);
      }
    }
    return error;
  }
);

export default apiClient;
