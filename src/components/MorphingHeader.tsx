
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
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center text-center mb-4 px-4 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-sans font-bold tracking-tight leading-none">
        Let's Make Your{' '}
        <span className="inline-block w-[90px] md:w-[110px] lg:w-[130px]">
          <span 
            className={`text-primary transition-all duration-500 ease-in-out ${
              isChanging ? 'opacity-0 transform scale-95 -translate-y-2' : 'opacity-100 transform scale-100 translate-y-0'
            }`}
            aria-live="polite"
          >
            {platforms[currentPlatform]}
          </span>
        </span>
        {' '}BlowUp
      </h1>
    </div>
  );
};

export default MorphingHeader;
