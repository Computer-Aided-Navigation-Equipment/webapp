import axios from "axios";

// Create an Axios instance with base URL and headers set up
const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND, // Backend base URL from environment variables
  headers: {
    "Content-Type": "application/json", // Default content type
  },
  withCredentials: true, // Include cookies with requests (important for session/refresh tokens)
});

// Request Interceptor: Attach the access token to every request if available
axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add Authorization header
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors and attempt token refresh
axiosRequest.interceptors.response.use(
  (response) => response, // Just return the response if successful
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 (unauthorized) and haven't retried this request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const { data } = await axiosRequest.post("/user/refresh-token");

        const newAccessToken = data.accessToken;

        // Store the new token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosRequest(originalRequest);
      } catch (refreshError) {
        // Refresh token failed — clear localStorage and redirect to login
        localStorage.removeItem("accessToken");
        document.cookie =
          "refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default axiosRequest;
