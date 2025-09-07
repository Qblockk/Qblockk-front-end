import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <AppSidebar></AppSidebar>
  )
}