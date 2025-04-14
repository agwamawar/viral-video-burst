
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

const Logo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg">
        <img 
          src="/logo.png" 
          alt="BlowUp AI Logo" 
          className="h-10 w-10"
          style={{ filter: 'brightness(0) invert(var(--logo-invert))' }}
        />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold">BlowUp AI</span>
      )}
    </div>
  );
};

export default Logo;
