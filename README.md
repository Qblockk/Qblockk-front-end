# QBLOCK Frontend

Sistema de certificación de documentos en blockchain XRP Ledger - Interfaz de usuario moderna y minimalista.

## 🚀 Tech Stack

- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.2** - Ultra-fast build tool and dev server
- **TanStack Router 1.131.35** - File-based routing con type-safety
- **TanStack Query 5.87.1** - Server state management
- **Zustand 5.0.8** - Global state management
- **Axios 1.13.2** - HTTP client con interceptors
- **Sonner 2.0.7** - Notificaciones modernas
- **react-hook-form + zod** - Validación de formularios
- **shadcn/ui** - Componentes UI modernos (New York style)
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit

## 📁 Project Structure

```
src/
├── components/          # Componentes React
│   ├── ui/             # shadcn/ui components (14 componentes)
│   ├── app-sidebar.tsx # Sidebar principal con navegación
│   ├── nav-main.tsx    # Navegación principal
│   └── nav-user.tsx    # Menú de usuario con logout
├── hooks/              # Custom hooks
│   ├── use-auth.ts     # Hook de autenticación con mutations
│   ├── use-documents.ts # Hook de documentos con TanStack Query
│   └── use-mobile.ts   # Detección de dispositivo móvil
├── lib/                # Utilidades y configuración
│   ├── api-config.ts   # Configuración de URLs backend
│   ├── axios.ts        # Instancia axios con interceptors JWT
│   └── utils.ts        # Helper functions
├── routes/             # File-based routing de TanStack Router
│   ├── __root.tsx      # Layout raíz (Toaster, DevTools)
│   ├── login.tsx       # Página de login pública
│   ├── verify.tsx      # Verificación pública de documentos
│   └── _authenticated/ # Rutas protegidas con middleware
│       ├── index.tsx   # Dashboard principal
│       └── documents/  # Gestión de documentos
│           ├── index.tsx  # Lista de documentos con tabla
│           └── upload.tsx # Subir documento (drag & drop)
├── services/           # API services con axios
│   ├── auth-service.ts     # Login, register, refresh, logout
│   └── document-service.ts # Upload, list, certify, verify
├── stores/             # Zustand stores
│   └── auth-store.ts   # Store de autenticación (persist)
├── assets/             # Imágenes y archivos estáticos
├── global.css          # Estilos globales de Tailwind
└── main.tsx           # Entry point con QueryClient y Router
```

## 🎨 Features

### Autenticación
- ✅ Login con JWT y refresh tokens
- ✅ Registro de usuarios
- ✅ Protected routes con middleware de TanStack Router
- ✅ Auto-refresh de tokens (401 interceptor)
- ✅ Logout con limpieza de estado
- ✅ Persist de sesión con Zustand

### Gestión de Documentos
- ✅ Subir documentos con drag & drop
- ✅ Lista de documentos con tabla shadcn/ui
- ✅ Certificar documentos en blockchain XRP Ledger
- ✅ Descargar documentos
- ✅ Eliminar documentos (soft delete)
- ✅ Ver hash SHA-256 del documento
- ✅ Ver transacción blockchain en explorador
- ✅ Estados: pending, certified, failed

### Verificación Pública
- ✅ Verificar autenticidad de documentos sin login
- ✅ Ver información de certificación blockchain
- ✅ Link directo al explorador XRP Ledger

### UX/UI
- ✅ Diseño minimalista con shadcn/ui (New York style)
- ✅ Sidebar colapsable responsive
- ✅ Notificaciones modernas con Sonner
- ✅ Loading states con Skeleton
- ✅ Validación de formularios con react-hook-form + zod
- ✅ Responsive design mobile-first
- ✅ Manejo de errores con toasts
- ✅ Progress bars para uploads

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Qblockk/Qblockk-front-end.git
cd qblockk-front-end
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎯 Key Components

### AppSidebar
The main sidebar component featuring:
- Team/organization switcher
- Collapsible navigation sections
- Project management
- User profile section

### Navigation Structure
- **Platform** - Main application sections
- **Projects** - Project-specific navigation
- **User** - Account and profile management

## 🎨 Styling

The project uses Tailwind CSS with a custom design system:
- Consistent spacing and typography
- Responsive breakpoints
- Dark/light theme support
- Custom component variants

## 🔧 Configuration

### Path Aliases
- `@/*` - Points to `./src/*`

### TypeScript
- Strict mode enabled
- Path mapping configured
- React JSX transform

### Vite
- SWC for fast compilation
- TanStack Router plugin
- Tailwind CSS integration

## 📦 Dependencies

### Core
- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.2

### UI & Styling
- Tailwind CSS 4.1.13
- shadcn/ui components
- Radix UI primitives
- Lucide React icons

### Routing & State
- TanStack Router 1.131.35
- Zustand 5.0.8
- TanStack Query 5.87.1

## 🚀 Deployment

Build the project for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

