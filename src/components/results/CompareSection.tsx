
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Lightbulb, BarChart, Check, AlertCircle } from 'lucide-react';
import { CompareResult } from '../../types/resultsTypes';
import ProgressBar from '../ui/ProgressBar';

interface CompareSectionProps {
  data: CompareResult;
}

const CompareSection = ({ data }: CompareSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Compare</h2>
      </div>

      <motion.div 
        variants={itemVariants}
        className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-6 flex items-center"
      >
        <div className="mr-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <Award className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-indigo-900 text-lg">
            Better than {data.percentileBetter}% of creators in your niche
          </h3>
          <p className="text-indigo-700">
            You're in the top {100 - data.percentileBetter}% of content performance
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <div className="flex items-center mb-2">
          <BarChart className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-medium text-gray-700">Performance Comparison</h3>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Industry Average</span>
            <span className="text-sm font-medium text-gray-600">{data.nicheAverage}</span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
            <div className="h-2 bg-gray-500 rounded-full" style={{ width: `${data.nicheAverage}%` }}></div>
          </div>
          
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Your Score</span>
            <span className="text-sm font-medium text-gray-600">{data.yourScore}</span>
          </div>
          <motion.div 
            className="w-full h-2 bg-gray-300 rounded-full mb-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="h-2 bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${data.yourScore}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </motion.div>
          
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Top Performers</span>
            <span className="text-sm font-medium text-gray-600">{data.yourScore + data.topPerformerGap}</span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ width: `${data.yourScore + data.topPerformerGap}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants}
          className="bg-green-50 rounded-xl p-4 border border-green-100"
        >
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-800">Your Strengths</h3>
          </div>
          
          <ul className="space-y-2">
            {data.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-amber-50 rounded-xl p-4 border border-amber-100"
        >
          <div className="flex items-center mb-2">
            <Lightbulb className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="font-semibold text-amber-800">Top Performer Insights</h3>
          </div>
          
          <ul className="space-y-2">
            {data.opportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{opportunity}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompareSection;
