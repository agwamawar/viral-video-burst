
import React from 'react';
import { useTheme } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Plus, History, User, PanelLeftClose } from "lucide-react";

const AppSidebar = () => {
  const { theme } = useTheme();
  const { state } = useSidebar();
  
  const menuItems = [
    { 
      icon: ({ className, ...props }) => (
        <div className="relative bg-primary/90 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-transform hover:scale-110">
          <Plus className="h-5 w-5 text-white absolute" {...props} />
          <Plus className="h-3 w-3 text-white/80" {...props} />
        </div>
      ),
      label: "New Video Analysis",
      className: "hover:bg-transparent py-2.5" 
    },
    { 
      icon: History, 
      label: "Recents",
      className: "hover:scale-105 transition-transform" 
    },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border flex flex-col">
      <SidebarHeader className="flex flex-col p-4">
        <div className="flex justify-end w-full mb-4">
          <SidebarTrigger 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
          >
            <PanelLeftClose className="h-4 w-4" />
          </SidebarTrigger>
        </div>
        <Logo />
      </SidebarHeader>
      
      <SidebarContent className="flex-grow">
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton tooltip={item.label}>
                    <item.icon className={`h-5 w-5 mr-2 ${item.className || ''}`} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between w-full">
          <SidebarMenuButton tooltip="User Profile">
            <User className="h-5 w-5 mr-2" />
            <span>Profile</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
