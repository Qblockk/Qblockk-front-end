import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { AuthService } from '@/services/auth-service'
import type { LoginRequest, RegisterRequest } from '@/types/auth'

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  health: () => [...authKeys.all, 'health'] as const,
}

// Health check query
export const useHealthCheck = () => {
  return useQuery({
    queryKey: authKeys.health(),
    queryFn: () => AuthService.healthCheck(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Profile query
export const useProfile = () => {
  const { isAuthenticated } = useAuthStore()
  
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => AuthService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient()
  const { login, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (response) => {
      if (response.success) {
        login(response.data.user)
        // Invalidate and refetch profile
        queryClient.invalidateQueries({ queryKey: authKeys.profile() })
      }
    },
    onError: () => {
      setLoading(false)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient()
  const { login, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterRequest) => AuthService.register(data),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (response) => {
      if (response.success) {
        login(response.data.user)
        // Invalidate and refetch profile
        queryClient.invalidateQueries({ queryKey: authKeys.profile() })
      }
    },
    onError: () => {
      setLoading(false)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient()
  const { logout, clearAuth } = useAuthStore()

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      logout()
      clearAuth()
      // Clear all queries
      queryClient.clear()
    },
    onError: () => {
      // Even if logout fails, clear local state
      logout()
      clearAuth()
      queryClient.clear()
    },
  })
}

// Custom hook for auth state
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser } = useAuthStore()
  const { data: profile, isLoading: profileLoading } = useProfile()

  // Initialize user from localStorage on mount
  React.useEffect(() => {
    if (!user && AuthService.isAuthenticated()) {
      const storedUser = AuthService.getStoredUser()
      if (storedUser) {
        setUser(storedUser)
      }
    }
  }, [user, setUser])

  return {
    user: profile?.data?.user || user,
    isAuthenticated,
    isLoading: isLoading || (isAuthenticated && profileLoading),
  }
}
