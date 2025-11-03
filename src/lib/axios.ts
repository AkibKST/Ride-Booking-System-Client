import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // console.log("Axios", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Token refresh logic
// -----------------------------------
let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};
// -----------------------------------

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log("Request failed", error.response.data.message);

    // Specific Error: Token Expired
    // and capture the original request
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    // error response may be undefined in some cases like network error
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      console.log("Your token is expired");

      // Mark the request as retry
      originalRequest._retry = true;

      // If token is already being refreshed, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      // If not refreshing, start the refresh process
      isRefreshing = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);

        // Process the queued requests after successful token refresh
        processQueue(null);

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        // Process the queued requests with error if refresh fails
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    //* For Everything
    return Promise.reject(error);
  }
);
