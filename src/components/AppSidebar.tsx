
import React from 'react';
import { ThemeToggle } from "@/components/ThemeToggle";
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
import { Home, Upload, BarChart2, Settings, Info, Github, PanelLeftClose } from "lucide-react";

const AppSidebar = () => {
  const { theme } = useTheme();
  const { state } = useSidebar();
  
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Upload, label: "Upload" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Settings, label: "Settings" },
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
                  <SidebarMenuButton isActive={item.active} tooltip={item.label}>
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Documentation">
                  <Info className="h-5 w-5 mr-2" />
                  <span>Documentation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="GitHub">
                  <Github className="h-5 w-5 mr-2" />
                  <span>GitHub</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between w-full">
          {state === "expanded" && (
            <span className="text-sm text-muted-foreground">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
