
import React from 'react';

const MorphingHeader = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Virality Analyzer
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Upload your content to analyze its virality potential
      </p>
    </div>
  );
};

export default MorphingHeader;
