import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/use-auth'

export function LogoutButton() {
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
