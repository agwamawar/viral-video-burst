
import React from "react";
import { motion } from "framer-motion";
import { Flame, BookmarkCheck, Sparkles, Share, TrendingUp } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProgressBar from "../components/ProgressBar";

interface ViralFactor {
  name: string;
  score?: number;
  detected?: boolean;
  timestamp?: string;
  description: string;
}

interface ViralityData {
  overallScore: number;
  viralFactors: ViralFactor[];
  projection: string;
}

interface ViralitySectionProps {
  data: ViralityData;
}

const ViralitySection: React.FC<ViralitySectionProps> = ({ data }) => {
  const getIconForFactor = (name: string) => {
    if (name.includes("Hook")) return <Flame size={18} className="text-red-500" />;
    if (name.includes("Save")) return <BookmarkCheck size={18} className="text-blue-500" />;
    if (name.includes("Wow")) return <Sparkles size={18} className="text-amber-500" />;
    if (name.includes("Share")) return <Share size={18} className="text-green-500" />;
    if (name.includes("Platform")) return <TrendingUp size={18} className="text-purple-500" />;
    return null;
  };

  return (
    <div>
      <SectionHeader 
        title="Virality Potential" 
        score={data.overallScore} 
        icon={<TrendingUp size={24} />} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg mb-6"
      >
        <p className="text-gray-700 dark:text-gray-200 font-medium">{data.projection}</p>
      </motion.div>
      
      <div className="space-y-4">
        {data.viralFactors.map((factor, index) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getIconForFactor(factor.name)}
                <h3 className="font-medium">{factor.name}</h3>
              </div>
              
              {factor.detected !== undefined ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  {factor.timestamp && `at ${factor.timestamp}`}
                </span>
              ) : factor.score !== undefined ? (
                <span className="font-semibold">{factor.score}%</span>
              ) : null}
            </div>
            
            {factor.score !== undefined && (
              <ProgressBar 
                value={factor.score} 
                showValue={false} 
                className="mb-2"
                color={factor.score >= 80 ? "success" : "warning"} 
              />
            )}
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {factor.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViralitySection;
