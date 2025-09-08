import * as React from "react"
import {
  Blocks,
  Wallet,
  Zap,
  Shield,
  BarChart3,
  Code,
  Settings2,
  TrendingUp,
  Database,
  FileCode,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from '@/hooks/use-auth'

// QBlockk Platform Data
const data = {
  user: {
    name: "QBlockk User",
    email: "user@qblockk.com",
    avatar: "/avatars/qblockk.jpg",
  },
  teams: [
    {
      name: "QBlockk Mainnet",
      logo: Blocks,
      plan: "Production",
    },
    {
      name: "QBlockk Testnet",
      logo: Code,
      plan: "Development",
    },
    {
      name: "QBlockk Devnet",
      logo: Database,
      plan: "Testing",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Blockchain",
      url: "/blockchain",
      icon: Blocks,
      items: [
        {
          title: "Explorer",
          url: "/blockchain/explorer",
        },
        {
          title: "Transactions",
          url: "/blockchain/transactions",
        },
        {
          title: "Validators",
          url: "/blockchain/validators",
        },
      ],
    },
    {
      title: "Smart Contracts",
      url: "/contracts",
      icon: FileCode,
      items: [
        {
          title: "Deploy",
          url: "/contracts/deploy",
        },
        {
          title: "My Contracts",
          url: "/contracts/my",
        },
        {
          title: "Templates",
          url: "/contracts/templates",
        },
      ],
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: Wallet,
      items: [
        {
          title: "My Wallets",
          url: "/wallet/my",
        },
        {
          title: "Send",
          url: "/wallet/send",
        },
        {
          title: "Receive",
          url: "/wallet/receive",
        },
      ],
    },
    {
      title: "DeFi",
      url: "/defi",
      icon: TrendingUp,
      items: [
        {
          title: "Swap",
          url: "/defi/swap",
        },
        {
          title: "Pools",
          url: "/defi/pools",
        },
        {
          title: "Staking",
          url: "/defi/staking",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Ethereum Integration",
      url: "/projects/ethereum",
      icon: Zap,
    },
    {
      name: "Polygon Bridge",
      url: "/projects/polygon",
      icon: Shield,
    },
    {
      name: "Custom Blockchain",
      url: "/projects/custom",
      icon: Code,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Use authenticated user data or fallback to sample data
  const userData = user ? {
    name: user.full_name,
    email: user.email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random`
  } : data.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
