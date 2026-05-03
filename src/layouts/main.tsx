import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar"; 

export default function Layout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          
          <AppSidebar />

          <main style={{ flex: 1, padding: '20px', maxWidth: '85%'}}>
            <SidebarTrigger className="mb-4 md:hidden" />
            <Outlet />
          </main>
          
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
