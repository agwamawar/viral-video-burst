
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

const Logo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Use dynamic import.meta.env.BASE_URL for Vite public assets
  const logoPath = `${import.meta.env.BASE_URL}logo.png`;
  
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg p-1.5 bg-primary/10">
        <img 
          src={logoPath}
          alt="BlowUp AI Logo" 
          className="h-8 w-8 object-contain"
          onError={(e) => {
            console.error('Logo failed to load:', e);
            // Fallback in case image fails to load
            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>';
          }}
        />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold">BlowUp AI</span>
      )}
    </div>
  );
};

export default Logo;
