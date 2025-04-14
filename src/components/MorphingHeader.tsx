
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
    <div className="flex items-center justify-center text-center mb-8 px-4 max-w-4xl mx-auto min-h-[120px]">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight leading-none flex items-center justify-center gap-3">
        Let's Make Your
        <span 
          className={`inline-flex justify-center items-center min-w-[120px] md:min-w-[140px] font-serif text-primary transition-all duration-500 ease-in-out ${
            isChanging ? 'opacity-0 transform scale-95 -translate-y-2' : 'opacity-100 transform scale-100 translate-y-0'
          }`}
          aria-live="polite"
        >
          {platforms[currentPlatform]}
        </span>
        BlowUp
      </h1>
    </div>
  );
};

export default MorphingHeader;
