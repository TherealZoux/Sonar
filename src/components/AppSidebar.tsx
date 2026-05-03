import { Compass, Search, Library } from "lucide-react"
import { NavLink } from "react-router-dom"
import { NavItem } from './NavItem'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// داتا المنيو عشان الكود يبقى أنضف
const items = [
  {
    title: "Discovery",
    url: "/",
    icon: Compass,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Library",
    url: "/library",
    icon: Library,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavItem
                    to={item.url}
                    icon={item.icon}
                    label={item.title}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
