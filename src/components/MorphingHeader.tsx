
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
      }, 600); // Slightly longer fade for smoother transition
    }, 3500); // Longer display time for better readability

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center text-center mb-8 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight leading-tight">
        Let's Make Your{' '}
        <span 
          className={`inline-block min-w-[6ch] text-center font-serif text-primary transition-all duration-600 ease-in-out ${
            isChanging ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
          }`}
          aria-live="polite"
        >
          {platforms[currentPlatform]}
        </span>
        {' '}BlowUp
      </h1>
    </div>
  );
};

export default MorphingHeader;
