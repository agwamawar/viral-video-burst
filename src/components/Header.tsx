
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border backdrop-blur-sm bg-background/80 px-4 sm:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <span className="font-semibold md:hidden">Viral Video Burst</span>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          <Button variant="ghost" className="font-semibold text-lg">
            Home
          </Button>
          <Button variant="ghost" className="font-semibold text-lg">
            Features
          </Button>
          <Button variant="ghost" className="font-semibold text-lg">
            Pricing
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="hidden sm:flex items-center gap-1 bg-gradient-viral hover:bg-gradient-viral hover:opacity-90">
            <Upload className="h-4 w-4 mr-1" />
            Upload Video
          </Button>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
