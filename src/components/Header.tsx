
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>BlowUp AI</SheetTitle>
                <SheetDescription>
                  AI-powered video virality analyzer
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Button variant="ghost" className="justify-start">How It Works</Button>
                <Button variant="ghost" className="justify-start">Pricing</Button>
                <Button variant="ghost" className="justify-start">About</Button>
                <Button variant="default" className="mt-4">
                  Sign Up Free <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost">How It Works</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">About</Button>
          <Button variant="default">
            Sign Up Free <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
