
import React from "react";
import { ArrowTrendingUp, ArrowTrendingDown } from "lucide-react";

interface ComparisonMetricProps {
  name: string;
  yours: number;
  benchmark: number;
  better: boolean;
}

const ComparisonMetric: React.FC<ComparisonMetricProps> = ({
  name,
  yours,
  benchmark,
  better,
}) => {
  const difference = Math.abs(yours - benchmark);
  const percentDifference = ((difference / benchmark) * 100).toFixed(0);

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg mb-3">
      <div>
        <h4 className="font-medium text-gray-700 dark:text-gray-300">{name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-lg">{yours}</span>
          <span className="text-gray-400 dark:text-gray-500 text-sm">vs</span>
          <span className="text-gray-500 dark:text-gray-400">{benchmark}</span>
        </div>
      </div>
      
      <div className={`flex items-center ${better ? 'text-green-500' : 'text-red-500'}`}>
        {better ? (
          <ArrowTrendingUp size={20} className="mr-1" />
        ) : (
          <ArrowTrendingDown size={20} className="mr-1" />
        )}
        <span className="font-bold">
          {percentDifference}% {better ? 'better' : 'lower'}
        </span>
      </div>
    </div>
  );
};

export default ComparisonMetric;
