
import React from 'react';
import { Flame } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-viral rounded-lg p-1.5">
        <Flame className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-viral">
        BlowUp AI
      </span>
    </div>
  );
};

export default Logo;
