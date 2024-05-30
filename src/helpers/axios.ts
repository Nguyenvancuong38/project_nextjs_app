import { getAccessToken } from "@/helpers/localAuth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/v1",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: any) {
    config.headers = {
      Authorization: `${getAccessToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (!error.response) {
      return error;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
