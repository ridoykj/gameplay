import axios, { type AxiosInstance } from "axios";



const createAxiosInstance = (baseUrl?: string): AxiosInstance => {
  const axiosInstance = baseUrl ? axios.create({
    baseURL: baseUrl,
  }) : axios.create();

  // 🟢 Attach token to every request dynamically
  axiosInstance.interceptors.request.use(
    (config) => {
      const auth = localStorage.getItem('auth');
      const accessToken = auth ? JSON.parse(auth).accessToken : null;
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      const timezone = localStorage.getItem('timezone');
      if (timezone) {
        config.headers['X-Timezone'] = timezone

      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🔁 Response interceptor: Handle 401 and retry request after refreshing token
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Prevent infinite retry loop
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          const auth = localStorage.getItem('auth');
          const refreshToken = auth ? JSON.parse(auth).refreshToken : null;

          if (!refreshToken) {
            // Optionally redirect to login
            return Promise.reject(error);
          }

          const { data } = await axios.post(`${baseUrl}/auth/refresh-token`, {
            refreshToken,
          });

          // Save new access token to localStorage
          const updatedAuth = { ...JSON.parse(auth || '{}'), accessToken: data.accessToken };
          localStorage.setItem('auth', JSON.stringify(updatedAuth));

          // 🟢 Manually update the Authorization header for this retry
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Token refresh failed, force logout or redirect
          localStorage.removeItem('auth');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
