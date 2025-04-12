
import React, { useState, useEffect } from 'react';

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];

const MorphingHeader = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPlatform((prev) => (prev + 1) % platforms.length);
        setIsChanging(false);
      }, 500); // Half a second for fade out
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold">
        BlowUp on{' '}
        <span 
          className={`inline-block min-w-[180px] transition-opacity duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
        >
          {platforms[currentPlatform]}
        </span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Analyze your content before you post
      </p>
    </div>
  );
};

export default MorphingHeader;
