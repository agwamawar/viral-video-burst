
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Timer, Image, BookOpen, ThumbsUp, LightbulbIcon } from 'lucide-react';
import { ContentResult } from '../../types/resultsTypes';
import ProgressBar from '../ui/ProgressBar';
import ScoreTag from '../ui/ScoreTag';

interface ContentSectionProps {
  data: ContentResult;
}

const ContentSection = ({ data }: ContentSectionProps) => {
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
        <h2 className="text-2xl font-bold text-gray-800">Content</h2>
        <ScoreTag score={data.overallScore} type="primary" label="Score:" className="text-base" />
      </div>

      <motion.p 
        variants={itemVariants}
        className="text-gray-600 mb-6"
      >
        This evaluation shows how well your content is structured and tells your story.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <LayoutGrid className="w-5 h-5 text-indigo-500 mr-2" />
            <h3 className="font-medium text-gray-700">Structure</h3>
          </div>
          <ProgressBar value={data.structure} color="bg-indigo-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Timer className="w-5 h-5 text-cyan-500 mr-2" />
            <h3 className="font-medium text-gray-700">Pacing</h3>
          </div>
          <ProgressBar value={data.pacing} color="bg-cyan-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Image className="w-5 h-5 text-rose-500 mr-2" />
            <h3 className="font-medium text-gray-700">Visual Quality</h3>
          </div>
          <ProgressBar value={data.visualQuality} color="bg-rose-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <BookOpen className="w-5 h-5 text-emerald-500 mr-2" />
            <h3 className="font-medium text-gray-700">Storytelling</h3>
          </div>
          <ProgressBar value={data.storytelling} color="bg-emerald-500" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div 
          variants={itemVariants}
          className="bg-green-50 rounded-xl p-4 border border-green-100"
        >
          <div className="flex items-center mb-2">
            <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-800">What's Working Well</h3>
          </div>
          
          <ul className="space-y-2">
            {data.tips.positive.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400 mt-2 mr-2"></span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-blue-50 rounded-xl p-4 border border-blue-100"
        >
          <div className="flex items-center mb-2">
            <LightbulbIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Growth Opportunities</h3>
          </div>
          
          <ul className="space-y-2">
            {data.tips.improvements.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-400 mt-2 mr-2"></span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContentSection;
