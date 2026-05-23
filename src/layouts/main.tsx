import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar"; 
import PlayerComponent from '@/components/PLayer';

export default function Layout() {
  return (
    <TooltipProvider>
      <SidebarProvider className='flex flex-col max-h-[70vh]'>
        <div style={{ display: 'flex', minHeight: '80vh', width: '100%', overflow: 'hidden', }}>
          
          <AppSidebar />

          <main style={{ flex: 1, padding: '20px', maxWidth: '100%', overflowY: 'scroll', overflowX: 'hidden'}} className='lg:max-w-[85%]! h-[100vh] pb-16! '>
            <SidebarTrigger className="mb-4 md:hidden" />
            <Outlet />
          </main>
          
        </div>
        <PlayerComponent />
      </SidebarProvider>
    </TooltipProvider>
  );
}
