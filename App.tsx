import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import { CONTACT_INFO, LOCATIONS, RENOVATION_SERVICES, CLEANING_SERVICES, FEATURED_PROJECTS } from './constants';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Initialize Lenis and global animations
  useEffect(() => {
    if (loading) return;

    // Fade in body
    gsap.to(document.body, { opacity: 1, duration: 0.5 });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP Context for cleanup
    const ctx = gsap.context(() => {
      
      // Hero Parallax
      gsap.to('.hero-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text Reveal Animation
      const splitElements = document.querySelectorAll('.reveal-text');
      splitElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // Card Stack Animation
      const cards = gsap.utils.toArray('.card-item');
      cards.forEach((card: any, i) => {
        const nextCard = cards[i + 1] as HTMLElement;
        if (nextCard) {
          gsap.to(card.querySelector('.card-inner'), {
            scale: 0.9,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top 10vh",
              scrub: true
            }
          });
        }
      });

      // Footer Reveal Parallax
      gsap.from('.footer-content', {
        y: -100,
        scrollTrigger: {
          trigger: '.footer-sticky',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
        }
      });

    }, wrapperRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      <CustomCursor />
      <Navigation />

      <div ref={wrapperRef} className="relative z-10 bg-swiss-cream mb-[100vh] shadow-2xl">
        
        {/* HERO SECTION */}
        <section className="hero-container relative h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full bg-black/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
            alt="Luxury Swiss Interior" 
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 text-center text-swiss-cream mix-blend-difference px-4">
            <h1 className="font-display text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter">
              <span className="block reveal-text">SWISS</span>
              <span className="block reveal-text text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>PRECISION</span>
            </h1>
            <div className="mt-8 flex flex-col items-center reveal-text delay-300">
              <p className="font-serif text-lg md:text-xl italic tracking-wide">Aristotel Multiple</p>
              <div className="h-16 w-px bg-white/50 mt-8 mb-4"></div>
              <ArrowDown className="animate-bounce" />
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-32 px-6 md:px-20 max-w-[1800px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight reveal-text text-swiss-dark">
              REDEFINING <br />
              <span className="text-swiss-gold italic font-serif">Luxury Living</span>
            </h2>
          </div>
          <div className="font-body text-xl font-light leading-relaxed text-swiss-stone space-y-8 reveal-text">
            <p>
              Based in the heart of Switzerland, Aristotel Multiple transforms spaces into masterpieces. 
              We blend traditional Swiss craftsmanship with modern brutalist and minimalist aesthetics.
            </p>
            <p>
              From intricate decorative plastering to clinical-grade deep cleaning, our attention to detail 
              is obsessive and uncompromising.
            </p>
            <div className="flex gap-4 items-center text-swiss-dark font-medium uppercase tracking-widest text-sm pt-8">
              <span>Est. 2024</span>
              <span className="w-2 h-2 rounded-full bg-swiss-gold"></span>
              <span>Swiss Operated</span>
            </div>
          </div>
        </section>

        {/* LOCATIONS MARQUEE */}
        <section className="py-12 bg-swiss-dark text-swiss-cream overflow-hidden whitespace-nowrap border-y border-white/10">
          <div className="inline-flex animate-[marquee_20s_linear_infinite]">
            {[...LOCATIONS, ...LOCATIONS, ...LOCATIONS].map((loc, idx) => (
              <div key={idx} className="flex items-center mx-8">
                <span className="font-display text-4xl md:text-6xl font-bold opacity-50 hover:opacity-100 transition-opacity cursor-none">{loc.name}</span>
                <span className="ml-16 text-swiss-gold text-2xl">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS STACK */}
        <section id="projects" className="py-24 bg-swiss-dark text-swiss-cream relative px-4 md:px-0">
          <div className="text-center mb-24 reveal-text">
            <span className="text-xs uppercase tracking-[0.3em] text-swiss-gold">Portfolio</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4">Selected Works</h2>
          </div>

          <div className="max-w-6xl mx-auto pb-20">
            {FEATURED_PROJECTS.map((project, index) => (
              <div key={project.id} className="card-item sticky top-24 md:top-32 h-[70vh] w-full flex items-center justify-center mb-12">
                <div className="card-inner w-full md:w-[90%] h-full bg-[#1F1F1F] border border-white/10 grid md:grid-cols-2 overflow-hidden shadow-2xl relative group">
                  <div className="p-8 md:p-12 flex flex-col justify-between z-10 bg-[#1F1F1F]">
                    <div>
                      <span className="font-display text-6xl md:text-8xl opacity-10 absolute top-4 left-6 text-swiss-cream">{project.id}</span>
                      <h3 className="font-serif text-3xl md:text-4xl italic mt-12 mb-2 text-white">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.categories.map(cat => (
                          <span key={cat} className="text-[10px] uppercase tracking-wider border border-white/20 px-2 py-1 rounded-full text-white/60">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-swiss-stone font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <button className="flex items-center gap-4 text-swiss-gold uppercase tracking-widest text-xs group-hover:gap-6 transition-all mt-8">
                      View Case Study <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="h-full w-full overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES LIST */}
        <section id="services" className="py-32 px-6 md:px-20 bg-[#E8E6E1] text-swiss-dark">
           <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-20">
               
               {/* Renovation Column */}
               <div className="reveal-text">
                 <h3 className="font-display text-3xl mb-12 border-b border-swiss-dark/20 pb-4 flex justify-between items-end">
                   <span>Renovation</span>
                   <span className="text-sm font-body opacity-50 tracking-wide font-normal">01</span>
                 </h3>
                 <ul className="space-y-6">
                   {RENOVATION_SERVICES.map((service, i) => (
                     <li key={i} className="group cursor-none">
                       <div className="flex items-baseline justify-between overflow-hidden">
                         <span className="text-xl md:text-2xl font-serif italic text-swiss-stone group-hover:text-swiss-dark group-hover:translate-x-4 transition-all duration-300">
                           {service}
                         </span>
                         <span className="opacity-0 group-hover:opacity-100 transition-opacity text-swiss-gold">✦</span>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Cleaning Column */}
               <div className="reveal-text delay-100">
                 <h3 className="font-display text-3xl mb-12 border-b border-swiss-dark/20 pb-4 flex justify-between items-end">
                   <span>Cleaning</span>
                   <span className="text-sm font-body opacity-50 tracking-wide font-normal">02</span>
                 </h3>
                 <ul className="space-y-6">
                   {CLEANING_SERVICES.map((service, i) => (
                     <li key={i} className="group cursor-none">
                       <div className="flex items-baseline justify-between overflow-hidden">
                         <span className="text-xl md:text-2xl font-serif italic text-swiss-stone group-hover:text-swiss-dark group-hover:translate-x-4 transition-all duration-300">
                           {service}
                         </span>
                         <span className="opacity-0 group-hover:opacity-100 transition-opacity text-swiss-gold">✦</span>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

             </div>
           </div>
        </section>

      </div>

      {/* STICKY FOOTER */}
      <footer id="contact" className="footer-sticky fixed bottom-0 left-0 w-full h-screen z-0 bg-swiss-dark text-swiss-cream flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
        </div>

        <div className="footer-content relative z-10 text-center px-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-swiss-stone">Ready to transform your space?</p>
          
          <a href={`mailto:${CONTACT_INFO.email}`} className="block font-display text-[8vw] md:text-[6vw] leading-none hover:text-swiss-gold transition-colors duration-500">
            GET IN TOUCH
          </a>
          
          <div className="mt-16 grid md:grid-cols-3 gap-12 text-center md:text-left max-w-4xl mx-auto border-t border-white/10 pt-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Phone className="text-swiss-gold mb-2" />
              <p className="font-serif italic text-xl">Phone</p>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-swiss-stone hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <Mail className="text-swiss-gold mb-2" />
              <p className="font-serif italic text-xl">Email</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-swiss-stone hover:text-white transition-colors">{CONTACT_INFO.email}</a>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <MapPin className="text-swiss-gold mb-2" />
              <p className="font-serif italic text-xl">Region</p>
              <p className="text-swiss-stone">Schweiz / Zürich / Aargau / Basel<br/>Zug / Luzern / Bern</p>
            </div>
          </div>

          <div className="mt-20 text-[10px] uppercase tracking-widest text-swiss-stone/50">
            © {new Date().getFullYear()} Aristotel Multiple. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;