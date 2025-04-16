
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const ProgressBar = ({ 
  value, 
  label, 
  color = 'bg-purple-500', 
  size = 'md', 
  showValue = true,
  className = ''
}: ProgressBarProps) => {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const valueText = showValue ? `${Math.round(value)}%` : '';
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1 text-sm font-medium">
          <span>{label}</span>
          {showValue && <span className="text-gray-600">{valueText}</span>}
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          className={`${heights[size]} ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
