import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
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

    // Reveal logo with scale and fade
    tl.to(logoRef.current, {
      scale: 1,
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
    // Slight pulse effect
    .to(logoRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1
    })
    // Fade out logo
    .to(logoRef.current, {
      scale: 0.9,
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
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#E8DCC8] via-[#D4C5B0] to-[#C9A961] flex flex-col justify-center items-center"
    >
      <div className="overflow-hidden mb-8">
        <img 
          ref={logoRef} 
          src="/logoaristotel.png" 
          alt="Aristotel Multiple Logo"
          className="w-48 md:w-64 h-auto scale-75 opacity-0"
        />
      </div>
      <div className="w-64 h-[2px] bg-white/30 relative overflow-hidden rounded-full">
        <div 
          ref={progressRef} 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9A961] to-white w-0 rounded-full" 
        />
      </div>
    </div>
  );
};

export default Preloader;