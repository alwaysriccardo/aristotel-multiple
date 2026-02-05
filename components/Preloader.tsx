import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 300);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#E8DCC8] flex flex-col justify-center items-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <img 
          src="/thisisthelogo.png" 
          alt="Aristotel Multiple"
          className="w-32 h-32 md:w-48 md:h-48 object-contain"
        />
      </div>

      {/* Company Name */}
      <h1 className="font-display text-xl md:text-2xl font-bold text-[#8B7355] mb-8 tracking-tight">
        ARISTOTEL MULTIPLE
      </h1>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 h-1 bg-[#8B7355]/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 text-sm text-[#8B7355]/60 font-medium">
        {progress}%
      </p>
    </div>
  );
};

export default Preloader;
