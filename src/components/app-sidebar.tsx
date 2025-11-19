import * as React from "react"
import {
  FileText,
  Shield,
  Search,
  Home,
  Blocks,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth-store"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Documentos",
      url: "/documents",
      icon: FileText,
      items: [
        {
          title: "Mis Documentos",
          url: "/documents",
        },
        {
          title: "Subir Documento",
          url: "/documents/upload",
        },
      ],
    },
    {
      title: "Verificar",
      url: "/verify",
      icon: Search,
    },
    {
      title: "Blockchain",
      url: "#",
      icon: Blocks,
      items: [
        {
          title: "XRP Ledger",
          url: "https://testnet.xrpl.org/",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">QBLOCK</span>
            <span className="truncate text-xs text-neutral-500">Blockchain Docs</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.fullName || "Usuario",
          email: user?.email || "",
          avatar: "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
