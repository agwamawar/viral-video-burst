
import React from "react";

interface ScoreTagProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

const ScoreTag: React.FC<ScoreTagProps> = ({ score, size = "md" }) => {
  const getBackgroundColor = () => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (score >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  const getSize = () => {
    switch (size) {
      case "sm": return "text-xs px-2 py-0.5";
      case "lg": return "text-base px-3 py-1.5";
      default: return "text-sm px-2.5 py-1";
    }
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${getBackgroundColor()} ${getSize()}`}>
      {score}%
    </span>
  );
};

export default ScoreTag;
