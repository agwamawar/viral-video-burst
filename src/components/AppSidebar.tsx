
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings, FileText, Upload, History } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const { expanded } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Home",
      icon: Home,
      path: "/",
    },
    {
      title: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/report",
    },
    {
      title: "History",
      icon: History,
      path: "/history",
    },
    {
      title: "Documentation",
      icon: FileText,
      path: "/docs",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        {expanded ? (
          <div className="flex items-center gap-2 px-2">
            <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-md flex items-center justify-center">
              B
            </div>
            <span className="font-semibold">BlowUp AI</span>
          </div>
        ) : (
          <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-md mx-auto flex items-center justify-center">
            B
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={isActive(item.path) ? "bg-primary/10 text-primary" : ""}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
