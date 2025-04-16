
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Star } from 'lucide-react';

interface ScoreTagProps {
  score: number;
  label?: string;
  type?: 'success' | 'warning' | 'neutral' | 'primary';
  icon?: boolean;
  className?: string;
}

const ScoreTag = ({ 
  score, 
  label, 
  type = 'neutral',
  icon = true,
  className = ''
}: ScoreTagProps) => {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    primary: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const getIcon = () => {
    if (!icon) return null;
    
    if (score >= 80) {
      return <CheckCircle className="w-4 h-4 mr-1 text-green-600" />;
    } else if (score >= 60) {
      return <Star className="w-4 h-4 mr-1 text-yellow-500" />;
    } else {
      return <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${colors[type]} ${className}`}
    >
      {getIcon()}
      {label && <span className="mr-1">{label}</span>}
      <span>{score}</span>
    </motion.div>
  );
};

export default ScoreTag;
