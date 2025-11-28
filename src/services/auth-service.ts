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

// Helper para transformar snake_case a camelCase
const transformUser = (backendUser: any): User => ({
  id: backendUser.id,
  email: backendUser.email,
  fullName: backendUser.full_name,
  phone: backendUser.phone,
  role: backendUser.role,
  last_log: backendUser.last_log
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGIN,
      credentials
    );
    // El backend devuelve { success, message, data: { user, tokens: { accessToken, refreshToken } } }
    return {
      user: transformUser(response.data.data.user),
      accessToken: response.data.data.tokens.accessToken,
      refreshToken: response.data.data.tokens.refreshToken
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.post(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.REGISTER,
      data
    );
    // El backend devuelve { success, message, data: { user, tokens: { accessToken, refreshToken } } }
    return {
      user: transformUser(response.data.data.user),
      accessToken: response.data.data.tokens.accessToken,
      refreshToken: response.data.data.tokens.refreshToken
    };
  },

  async logout(): Promise<void> {
    await authApi.post(API_CONFIG.AUTH_SERVICE.ENDPOINTS.LOGOUT);
  },

  async getProfile(): Promise<User> {
    const response = await authApi.get(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.PROFILE
    );
    // El backend devuelve { success, data: { user } }
    return transformUser(response.data.data.user);
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await authApi.post(
      API_CONFIG.AUTH_SERVICE.ENDPOINTS.REFRESH,
      { refreshToken }
    );
    // El backend devuelve { success, message, data: { accessToken, user } }
    return {
      user: transformUser(response.data.data.user),
      accessToken: response.data.data.accessToken,
      refreshToken: refreshToken // El backend no devuelve un nuevo refreshToken
    };
  },
};
