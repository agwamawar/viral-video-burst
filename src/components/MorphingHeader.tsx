
import React, { useState, useEffect } from 'react';

const platforms = ['Reel', 'Short', 'TikTok', 'Snap'];

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
    <div className="text-center mb-12 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-normal leading-tight tracking-tight">
        Let's Make Your{' '}
        <span 
          className={`inline-block min-w-[100px] text-primary transition-opacity duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
        >
          {platforms[currentPlatform]}
        </span>
        {' '}BlowUp
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Analyze your content before you post
      </p>
    </div>
  );
};

export default MorphingHeader;
