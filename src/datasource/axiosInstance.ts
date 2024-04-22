import axios from "axios";
// import { getToken } from "./localstorage.datasource";

const axiosInstance = axios.create({
  baseURL: import.meta.env.API,
  timeout: 1000,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (getToken(import.meta.env.VITE_MAIN_BE_TOKEN)) {
//       config.headers["Authorization"] =
//         "Bearer " + getToken(`${import.meta.env.VITE_MAIN_BE_TOKEN}`);
//     }

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default axiosInstance;
