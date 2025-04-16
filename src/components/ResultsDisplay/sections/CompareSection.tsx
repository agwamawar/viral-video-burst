
import React from "react";
import { motion } from "framer-motion";
import { BarChart, ArrowUp } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ComparisonMetric from "../components/ComparisonMetric";

interface ComparisonMetricData {
  name: string;
  yours: number;
  nicheBenchmark: number;
  better: boolean;
}

interface CompareData {
  percentileBetter: number;
  metrics: ComparisonMetricData[];
  insight: string;
}

interface CompareSectionProps {
  data: CompareData;
}

const CompareSection: React.FC<CompareSectionProps> = ({ data }) => {
  return (
    <div>
      <SectionHeader 
        title="Niche Comparison" 
        icon={<BarChart size={24} />} 
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl blur-md opacity-30"></div>
          <div className="relative bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <ArrowUp className="text-green-500" size={24} />
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {data.percentileBetter}%
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              better than creators in your niche
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6"
      >
        <p className="text-gray-700 dark:text-gray-300">{data.insight}</p>
      </motion.div>
      
      <div className="space-y-2">
        {data.metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <ComparisonMetric
              name={metric.name}
              yours={metric.yours}
              benchmark={metric.nicheBenchmark}
              better={metric.better}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompareSection;
