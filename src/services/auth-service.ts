import apiClient from '@/lib/api-client'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshResponse,
  ProfileResponse
} from '@/types/auth'

export class AuthService {
  // Health check
  static async healthCheck() {
    const response = await apiClient.get('/health')
    return response.data
  }

  // Register user
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      if (import.meta.env.DEV) {
        console.log('Attempting registration')
      }
      const response = await apiClient.post<AuthResponse>('/auth/register', data)
      
      if (response.data.success) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', response.data.data.tokens.accessToken)
        localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        if (import.meta.env.DEV) {
          console.log('Registration successful, tokens stored')
        }
      }
      
      return response.data
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Registration error:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
      }
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }

  // Login user
  static async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      if (import.meta.env.DEV) {
        console.log('Attempting login')
      }
      const response = await apiClient.post<AuthResponse>('/auth/login', data)
      
      if (response.data.success) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', response.data.data.tokens.accessToken)
        localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
      }
      
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  // Refresh token
  static async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    try {
      const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
        refreshToken
      })
      
      if (response.data.success) {
        // Update access token
        localStorage.setItem('accessToken', response.data.data.accessToken)
      }
      
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed')
    }
  }

  // Get user profile
  static async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get<ProfileResponse>('/auth/profile')
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile')
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error: any) {
      // Even if logout fails on server, clear local data
      if (import.meta.env.DEV) {
        console.warn('Logout request failed:', error.message)
      }
    } finally {
      // Always clear local storage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    return !!(token && user)
  }

  // Get stored user
  static getStoredUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }
}
