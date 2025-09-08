import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from '@/components/auth-guard'
import { AppSidebar } from '@/components/app-sidebar'
import { useAuth } from '@/hooks/use-auth'
import { FileCode, Wallet, Search, Zap, Shield, Globe, TrendingUp } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { user } = useAuth()
  
  return (
    <AuthGuard requireAuth={true}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      QBlockk Platform
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard Blockchain</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.full_name || 'User'}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Network Status</p>
                  <p className="text-2xl font-bold">Online</p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blocks</p>
                  <p className="text-2xl font-bold">1,234,567</p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">45.2K</p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Validators</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Block #1234567 mined</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Transaction confirmed</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Smart contract deployed</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Network Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hash Rate</span>
                    <span className="text-sm font-medium">2.4 TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <span className="text-sm font-medium">15.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gas Price</span>
                    <span className="text-sm font-medium">21 Gwei</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Size</span>
                    <span className="text-sm font-medium">2.1 GB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <FileCode className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Deploy Contract</p>
                    <p className="text-xs text-muted-foreground">Deploy a new smart contract</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Create Wallet</p>
                    <p className="text-xs text-muted-foreground">Generate a new wallet</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Explore Blocks</p>
                    <p className="text-xs text-muted-foreground">Browse blockchain data</p>
                  </div>
                </button>
              </div>
            </div>

            {/* QBlockk Features */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">QBlockk Features</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium">Fast Transactions</h4>
                  <p className="text-sm text-muted-foreground">Lightning-fast confirmations</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Secure</h4>
                  <p className="text-sm text-muted-foreground">Advanced cryptography</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium">Decentralized</h4>
                  <p className="text-sm text-muted-foreground">No single point of failure</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-medium">Scalable</h4>
                  <p className="text-sm text-muted-foreground">Thousands of TPS</p>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}