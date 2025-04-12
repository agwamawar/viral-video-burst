
import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressDisplayProps {
  score: number;
  size: number;
  strokeWidth: number;
  className?: string;
}

export const CircularProgressDisplay: React.FC<CircularProgressDisplayProps> = ({
  score,
  size,
  strokeWidth,
  className
}) => {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, score));
  
  // Calculate properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (normalizedScore * circumference) / 100;
  
  // Determine color based on score
  const getColor = () => {
    if (normalizedScore < 40) return '#EF4444'; // red
    if (normalizedScore < 70) return '#F59E0B'; // amber
    return '#10B981'; // green
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-25"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Text in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{normalizedScore}%</span>
      </div>
    </div>
  );
};
