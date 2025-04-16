
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Check, Award, Users } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProgressBar from "../components/ProgressBar";

interface ConceptInsight {
  name: string;
  score: number;
  description: string;
}

interface ConceptData {
  overallScore: number;
  insights: ConceptInsight[];
  feedback: string;
}

interface ConceptSectionProps {
  data: ConceptData;
}

const ConceptSection: React.FC<ConceptSectionProps> = ({ data }) => {
  const getIconForInsight = (name: string) => {
    switch (name) {
      case "Emotional Pull": return <Heart size={18} />;
      case "Clarity": return <Check size={18} />;
      case "Uniqueness": return <Award size={18} />;
      case "Audience Relevance": return <Users size={18} />;
      default: return null;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div>
      <SectionHeader 
        title="Concept Analysis" 
        score={data.overallScore} 
        icon={<Lightbulb size={24} />} 
      />
      
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-gray-700 dark:text-gray-200"
        >
          {data.feedback}
        </motion.div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {data.insights.map((insight, index) => (
            <motion.div
              key={insight.name}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-500 dark:text-purple-400">
                  {getIconForInsight(insight.name)}
                </span>
                <h3 className="font-medium">{insight.name}</h3>
              </div>
              <ProgressBar value={insight.score} className="mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConceptSection;
