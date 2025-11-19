import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { authService, type LoginCredentials, type RegisterData } from '@/services/auth-service';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success('Inicio de sesión exitoso');
      navigate({ to: '/' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success('Registro exitoso');
      navigate({ to: '/' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al registrarse';
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Sesión cerrada');
      navigate({ to: '/login' });
    },
    onError: () => {
      clearAuth();
      queryClient.clear();
      navigate({ to: '/login' });
    },
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: Infinity,
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
  };
};
