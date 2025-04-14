
import React from 'react';
import { Flame } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const Logo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary/10 rounded-lg p-1.5">
        <Flame className="h-5 w-5 text-primary" />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold">BlowUp AI</span>
      )}
    </div>
  );
};

export default Logo;
