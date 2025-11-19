import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from './api-config';

export const authApi = axios.create({
  baseURL: API_CONFIG.AUTH_SERVICE.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = axios.create({
  baseURL: API_CONFIG.DOCUMENT_SERVICE.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const authResponseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      const response = await authApi.post(API_CONFIG.AUTH_SERVICE.ENDPOINTS.REFRESH, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return axios(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

documentApi.interceptors.request.use(authRequestInterceptor, (error) => Promise.reject(error));
documentApi.interceptors.response.use((response) => response, authResponseInterceptor);

authApi.interceptors.request.use(authRequestInterceptor, (error) => Promise.reject(error));
authApi.interceptors.response.use((response) => response, authResponseInterceptor);

export default documentApi;
