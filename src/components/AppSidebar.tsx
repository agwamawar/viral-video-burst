
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
    { icon: Plus, label: "New Video Analysis", className: "text-primary" },
    { icon: History, label: "Recents" },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border">
      <SidebarHeader className="flex flex-col items-center p-4">
        <div className="flex items-center justify-between w-full py-3">
          <Logo />
          <SidebarTrigger 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
          >
            <PanelLeftClose className="h-4 w-4" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
