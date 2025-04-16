
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, Sparkles, Users } from 'lucide-react';
import { ConceptResult } from '../../types/resultsTypes';
import ProgressBar from '../ui/ProgressBar';
import ScoreTag from '../ui/ScoreTag';

interface ConceptSectionProps {
  data: ConceptResult;
}

const ConceptSection = ({ data }: ConceptSectionProps) => {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Concept</h2>
        <ScoreTag score={data.overallScore} type="primary" label="Score:" className="text-base" />
      </div>

      <motion.p 
        variants={itemVariants}
        className="text-gray-600 mb-6"
      >
        This analysis shows how well your content idea resonates with your target audience.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Heart className="w-5 h-5 text-pink-500 mr-2" />
            <h3 className="font-medium text-gray-700">Emotional Pull</h3>
          </div>
          <ProgressBar value={data.emotionalPull} color="bg-pink-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-medium text-gray-700">Clarity</h3>
          </div>
          <ProgressBar value={data.clarity} color="bg-blue-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="font-medium text-gray-700">Uniqueness</h3>
          </div>
          <ProgressBar value={data.uniqueness} color="bg-amber-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="font-medium text-gray-700">Audience Relevance</h3>
          </div>
          <ProgressBar value={data.audienceRelevance} color="bg-green-500" />
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-6 bg-purple-50 rounded-xl p-4 border border-purple-100"
      >
        <h3 className="font-semibold text-purple-800 mb-2">Key Insights</h3>
        <ul className="space-y-2">
          {data.feedback.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-400 mt-2 mr-2"></span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ConceptSection;
