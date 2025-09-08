// User types
export interface User {
  id: string
  email: string
  full_name: string
  role: string
  createdAt?: string
}

// Token types
export interface Tokens {
  accessToken: string
  refreshToken: string
}

// Auth response types
export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    tokens: Tokens
  }
}

export interface RefreshResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    user: User
  }
}

export interface ProfileResponse {
  success: boolean
  data: {
    user: User
  }
}

// Request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
}

export interface RefreshRequest {
  refreshToken: string
}

// Error response type
export interface ApiError {
  success: false
  message: string
}
