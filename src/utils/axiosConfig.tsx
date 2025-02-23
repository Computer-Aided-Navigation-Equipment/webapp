import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosRequest.post("/user/refresh-token");

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosRequest(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        document.cookie =
          "refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosRequest;
