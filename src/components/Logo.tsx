
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import logoImage from '/logo.png';

const Logo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg p-1.5">
        <img 
          src={logoImage} 
          alt="BlowUp AI Logo" 
          className="h-8 w-8 object-contain"
        />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold">BlowUp AI</span>
      )}
    </div>
  );
};

export default Logo;
