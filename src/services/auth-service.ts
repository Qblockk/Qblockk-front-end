import { authApi } from '@/lib/axios';
import { API_CONFIG } from '@/lib/api-config';
import type { User } from '@/stores/auth-store';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.REGISTER,
      data
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await authApi.post(API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGOUT);
  },

  async getProfile(): Promise<User> {
    const response = await authApi.get<User>(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.PROFILE
    );
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.REFRESH,
      { refreshToken }
    );
    return response.data;
  },
};
