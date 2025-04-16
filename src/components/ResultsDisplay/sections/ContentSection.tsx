
import React from "react";
import { motion } from "framer-motion";
import { LayoutList, Clock, Image, MessageSquareText } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProgressBar from "../components/ProgressBar";

interface ContentElement {
  name: string;
  score: number;
  tip: string;
}

interface ContentData {
  overallScore: number;
  elements: ContentElement[];
  topTip: string;
}

interface ContentSectionProps {
  data: ContentData;
}

const ContentSection: React.FC<ContentSectionProps> = ({ data }) => {
  const getIconForElement = (name: string) => {
    switch (name) {
      case "Structure": return <LayoutList size={18} />;
      case "Pacing": return <Clock size={18} />;
      case "Visual Quality": return <Image size={18} />;
      case "Storytelling": return <MessageSquareText size={18} />;
      default: return null;
    }
  };

  return (
    <div>
      <SectionHeader 
        title="Content Evaluation" 
        score={data.overallScore} 
        icon={<LayoutList size={24} />} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500"
      >
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Top Creator Tip</h3>
        <p className="text-blue-700 dark:text-blue-200">{data.topTip}</p>
      </motion.div>
      
      <div className="space-y-5">
        {data.elements.map((element, index) => (
          <motion.div
            key={element.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 dark:text-blue-400">
                  {getIconForElement(element.name)}
                </span>
                <h3 className="font-medium">{element.name}</h3>
              </div>
              <span className="font-semibold">
                {element.score}%
              </span>
            </div>
            
            <ProgressBar value={element.score} showValue={false} className="mb-2" color={element.score >= 80 ? "success" : element.score >= 60 ? "warning" : "danger"} />
            
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{element.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
