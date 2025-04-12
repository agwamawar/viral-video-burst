
import React from 'react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
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
} from "@/components/ui/sidebar";
import { Home, Upload, BarChart2, Settings, Info, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppSidebar = () => {
  const { theme } = useTheme();
  
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Upload, label: "Upload" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center w-full py-3">
          <div className="font-bold text-xl bg-gradient-viral text-transparent bg-clip-text">Viral Video Burst</div>
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
          <span className="text-sm text-muted-foreground">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
