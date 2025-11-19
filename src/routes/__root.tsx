import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })