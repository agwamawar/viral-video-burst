
import React from 'react';
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-6 px-4 sm:px-6 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold bg-gradient-viral text-transparent bg-clip-text">
              Viral Video Burst
            </span>
            <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">Beta</span>
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-foreground transition-colors">
              Help Center
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © {year} Viral Video Burst
            </span>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
