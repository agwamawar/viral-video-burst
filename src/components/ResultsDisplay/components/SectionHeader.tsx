
import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  score?: number;
  icon?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, score, icon }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {icon && <div className="text-purple-500 dark:text-purple-400">{icon}</div>}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>
      
      {score !== undefined && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg md:text-xl font-bold px-4 py-1 rounded-full">
            {score}%
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeader;
