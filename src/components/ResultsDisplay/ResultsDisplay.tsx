
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import ConceptSection from "./sections/ConceptSection";
import ContentSection from "./sections/ContentSection";
import ViralitySection from "./sections/ViralitySection";
import CompareSection from "./sections/CompareSection";
import { mockResultsData } from "./mockData";

interface ResultsDisplayProps {
  results?: typeof mockResultsData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results = mockResultsData }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid gap-8 md:gap-10"
      >
        <motion.div variants={sectionVariants}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Content Analysis Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Here's how your content is performing across key metrics
          </p>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
            <ConceptSection data={results.concept} />
          </Card>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
            <ContentSection data={results.content} />
          </Card>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
            <ViralitySection data={results.virality} />
          </Card>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
            <CompareSection data={results.compare} />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsDisplay;
