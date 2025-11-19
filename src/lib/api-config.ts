export const API_CONFIG = {
  AUTH_SERVICE: {
    BASE_URL: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3002',
    ENDPOINTS: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
  },
  DOCUMENT_SERVICE: {
    BASE_URL: import.meta.env.VITE_DOCUMENT_SERVICE_URL || 'http://localhost:3003',
    ENDPOINTS: {
      UPLOAD: '/documents/upload',
      LIST: '/documents',
      GET_DOCUMENT: (id: string) => `/documents/${id}`,
      CERTIFY: (id: string) => `/documents/${id}/certify`,
      DOWNLOAD: (id: string) => `/documents/${id}/download`,
      DELETE: (id: string) => `/documents/${id}`,
      VERIFICATIONS: (id: string) => `/documents/${id}/verifications`,
      VERIFY: '/verify',
      HEALTH: '/health',
    },
  },
} as const;
