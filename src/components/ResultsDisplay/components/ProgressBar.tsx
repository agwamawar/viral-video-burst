
import React from "react";

interface ProgressBarProps {
  value: number;
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "default" | "success" | "warning" | "danger";
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  className = "", 
  showValue = true,
  size = "md",
  color = "default" 
}) => {
  const getHeight = () => {
    switch (size) {
      case "sm": return "h-2";
      case "lg": return "h-4";
      default: return "h-3";
    }
  };

  const getColor = () => {
    switch (color) {
      case "success": return "bg-green-500";
      case "warning": return "bg-amber-500";
      case "danger": return "bg-red-500";
      default: return "bg-purple-500";
    }
  };

  const getValueColor = () => {
    if (value >= 80) return "text-green-600 dark:text-green-400";
    if (value >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className={`text-sm font-medium ${getValueColor()}`}>
            {value}%
          </span>
        )}
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${getHeight()}`}>
        <div
          className={`${getColor()} ${getHeight()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
