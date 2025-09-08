# QBlockk Frontend

A modern React application built with TypeScript, featuring a sophisticated sidebar navigation system and modern UI components.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing with file-based routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icon toolkit
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful data synchronization

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── app-sidebar.tsx  # Main sidebar component
│   ├── nav-main.tsx     # Main navigation
│   ├── nav-projects.tsx # Projects navigation
│   ├── nav-user.tsx     # User profile section
│   └── team-switcher.tsx # Team/organization switcher
├── routes/              # File-based routing
│   ├── __root.tsx       # Root layout with sidebar
│   ├── index.tsx        # Home page
│   └── about.tsx        # About page
├── assets/              # Static assets
├── global.css           # Global styles
└── main.tsx            # Application entry point
```

## 🎨 Features

- **Collapsible Sidebar** - Responsive sidebar with icon mode
- **Modern UI Components** - Built with shadcn/ui and Radix UI
- **Type-Safe Routing** - File-based routing with TanStack Router
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Theme** - Built-in theme support
- **Accessibility** - WCAG compliant components
- **Developer Experience** - Hot reload, TypeScript, ESLint

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

