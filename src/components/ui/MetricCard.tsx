
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';

interface MetricCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  description?: string;
  color?: string;
  className?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  color = 'bg-purple-500',
  className = '' 
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center mb-2">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <ProgressBar value={value} color={color} />
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </motion.div>
  );
};

export default MetricCard;
