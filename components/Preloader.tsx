import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  useEffect(() => {
    // Create timeline
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        setTimeout(() => {
          onComplete();
        }, 100);
      }
    });

    // Animate content in
    tl.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    )
    // Animate progress bar
    .to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.3")
    // Fade out content
    .to(contentRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.6,
      ease: "power2.in"
    })
    // Slide container up
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.2");

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#E8DCC8] via-[#D4C5B0] to-[#C9A961] flex flex-col justify-center items-center"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center bg-white/10 rounded-lg">
          <img 
            src="/thisisthelogo.png" 
            alt="Aristotel Multiple"
            className="w-full h-full object-contain"
            onLoad={() => {
              console.log('✅ Logo loaded successfully!');
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.error('❌ Logo failed to load!');
              console.error('Attempted path:', e.currentTarget.src);
              setImageError(true);
            }}
            style={{ display: imageError ? 'none' : 'block' }}
          />
          {imageError && (
            <div className="text-[#8B7355] text-center text-sm">
              <p>Logo not found</p>
              <p className="text-xs opacity-50">/thisisthelogo.png</p>
            </div>
          )}
        </div>
        
        {/* Company Name */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#8B7355] tracking-tight">
          ARISTOTEL MULTIPLE
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-64 h-1 bg-white/20 relative overflow-hidden rounded-full">
          <div 
            ref={progressRef} 
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#C9A961] to-white origin-left scale-x-0 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
