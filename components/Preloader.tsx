import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Reveal text
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
    // Progress bar
    .to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.5")
    // Fade out text
    .to(textRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.5
    })
    // Slide up curtain
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-swiss-cream flex flex-col justify-center items-center text-swiss-dark"
    >
      <div className="overflow-hidden mb-8">
        <h1 
          ref={textRef} 
          className="font-display text-4xl md:text-6xl font-bold translate-y-full opacity-0"
        >
          ARISTOTEL MULTIPLE
        </h1>
      </div>
      <div className="w-64 h-[2px] bg-gray-300 relative overflow-hidden">
        <div 
          ref={progressRef} 
          className="absolute left-0 top-0 h-full bg-swiss-dark w-0" 
        />
      </div>
    </div>
  );
};

export default Preloader;