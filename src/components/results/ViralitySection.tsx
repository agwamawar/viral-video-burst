
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Share2, Bookmark, Globe, Star } from 'lucide-react';
import { ViralityResult } from '../../types/resultsTypes';
import ProgressBar from '../ui/ProgressBar';
import ScoreTag from '../ui/ScoreTag';

interface ViralitySectionProps {
  data: ViralityResult;
}

const ViralitySection = ({ data }: ViralitySectionProps) => {
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

  // Determine virality tag color
  const getViralityTagColor = (potential: string) => {
    switch (potential) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Virality</h2>
        <div className="flex flex-wrap gap-2">
          <ScoreTag score={data.overallScore} type="primary" label="Score:" className="text-base" />
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getViralityTagColor(data.viralPotential)}-100 text-${getViralityTagColor(data.viralPotential)}-800 border border-${getViralityTagColor(data.viralPotential)}-200`}
          >
            <Star className="w-4 h-4 mr-1" />
            Viral Potential: {data.viralPotential}
          </motion.div>
        </div>
      </div>

      <motion.p 
        variants={itemVariants}
        className="text-gray-600 mb-6"
      >
        This analysis shows how likely your content is to gain organic reach and engagement.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Flame className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="font-medium text-gray-700">Hook Strength 🔥</h3>
          </div>
          <ProgressBar value={data.hookStrength} color="bg-orange-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Share2 className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-medium text-gray-700">Shareability</h3>
          </div>
          <ProgressBar value={data.shareability} color="bg-blue-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Bookmark className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="font-medium text-gray-700">Save-ability</h3>
          </div>
          <ProgressBar value={data.saveability} color="bg-purple-500" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <Globe className="w-5 h-5 text-teal-500 mr-2" />
            <h3 className="font-medium text-gray-700">Platform Alignment</h3>
          </div>
          <ProgressBar value={data.platformAlignment} color="bg-teal-500" />
        </motion.div>
      </div>

      {data.wowMoments.length > 0 && (
        <motion.div 
          variants={itemVariants}
          className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-100"
        >
          <h3 className="font-semibold text-amber-800 mb-2">✨ Wow Moments Detected</h3>
          <div className="space-y-3">
            {data.wowMoments.map((moment, index) => (
              <div key={index} className="flex items-start bg-white p-3 rounded-lg border border-amber-200">
                <div className="mr-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
                <div>
                  {moment.timestamp && (
                    <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      at {moment.timestamp}
                    </span>
                  )}
                  <p className="text-gray-700 mt-1">{moment.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ViralitySection;
