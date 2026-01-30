import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Mail, Phone, MapPin, ArrowRight, Star, MessageCircle } from 'lucide-react';

import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import FloatingActions from './components/FloatingActions';
import { CONTACT_INFO, LOCATIONS, RENOVATION_SERVICES, CLEANING_SERVICES, FEATURED_PROJECTS, REVIEWS } from './constants';

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
      <FloatingActions />

      <div ref={wrapperRef} className="relative z-10 bg-swiss-cream mb-[100vh] shadow-2xl">
        
        {/* HERO SECTION */}
        <section className="hero-container relative h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
            alt="Luxury Swiss Interior" 
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 text-center text-white px-6 md:px-4 max-w-6xl mx-auto">
            {/* Semi-transparent background for better readability on mobile */}
            <div className="md:hidden absolute inset-0 -mx-6 bg-black/30 backdrop-blur-sm"></div>
            
            <h1 className="font-serif text-[7vw] sm:text-[6vw] md:text-[3.5vw] leading-[1.3] md:leading-tight tracking-wide italic reveal-text relative py-8 md:py-0" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              "WE ARE WHAT WE REPEATEDLY DO. EXCELLENCE, THEN, IS NOT AN ACT, BUT A HABIT."
            </h1>
            <div className="mt-6 md:mt-8 flex flex-col items-center reveal-text delay-300 relative">
              <p className="font-display text-base md:text-base tracking-[0.3em] uppercase font-bold" 
                 style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                — ARISTOTLE
              </p>
              <div className="h-12 md:h-16 w-px bg-white/70 mt-6 md:mt-8 mb-3 md:mb-4"></div>
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
                    <button className="flex items-center gap-4 text-swiss-gold uppercase tracking-widest text-xs group-hover:gap-6 transition-all mt-8 shine-effect px-4 py-2 border border-swiss-gold/30 rounded-full hover:bg-swiss-gold/10">
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
        <section id="services" className="py-32 px-6 md:px-20 bg-[#E8E6E1] text-swiss-dark relative overflow-hidden">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-swiss-gold/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-swiss-dark/5 rounded-full blur-3xl"></div>
           
           <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-20 reveal-text">
               <span className="text-xs uppercase tracking-[0.3em] text-swiss-gold">Our Expertise</span>
               <h2 className="font-display text-4xl md:text-5xl mt-4">Services</h2>
               <p className="font-body text-swiss-stone mt-6 max-w-2xl mx-auto">
                 From meticulous renovations to pristine cleaning, we deliver excellence in every detail.
               </p>
             </div>

             <div className="grid md:grid-cols-2 gap-12">
               
               {/* Renovation Column */}
               <div className="reveal-text bg-white/50 backdrop-blur-sm p-10 rounded-2xl border border-swiss-dark/10 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-swiss-gold/20 rounded-full flex items-center justify-center group-hover:bg-swiss-gold/30 transition-colors">
                     <span className="text-2xl font-display text-swiss-dark">01</span>
                   </div>
                   <h3 className="font-display text-3xl">Renovation</h3>
                 </div>
                 <div className="h-1 w-20 bg-swiss-gold mb-8 group-hover:w-full transition-all duration-700"></div>
                 <ul className="space-y-5">
                   {RENOVATION_SERVICES.map((service, i) => (
                     <li key={i} className="group/item cursor-none flex items-start gap-3">
                       <span className="mt-2 w-2 h-2 rounded-full bg-swiss-gold flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                       <div className="flex-1">
                         <span className="text-lg md:text-xl font-serif italic text-swiss-stone group-hover/item:text-swiss-dark transition-colors duration-300 block">
                           {service}
                         </span>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Cleaning Column */}
               <div className="reveal-text delay-100 bg-swiss-dark/95 backdrop-blur-sm p-10 rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 group text-swiss-cream">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-swiss-gold/20 rounded-full flex items-center justify-center group-hover:bg-swiss-gold/30 transition-colors">
                     <span className="text-2xl font-display text-swiss-cream">02</span>
                   </div>
                   <h3 className="font-display text-3xl">Cleaning</h3>
                 </div>
                 <div className="h-1 w-20 bg-swiss-gold mb-8 group-hover:w-full transition-all duration-700"></div>
                 <ul className="space-y-5">
                   {CLEANING_SERVICES.map((service, i) => (
                     <li key={i} className="group/item cursor-none flex items-start gap-3">
                       <span className="mt-2 w-2 h-2 rounded-full bg-swiss-gold flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                       <div className="flex-1">
                         <span className="text-lg md:text-xl font-serif italic text-swiss-stone group-hover/item:text-swiss-cream transition-colors duration-300 block">
                           {service}
                         </span>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

             </div>
           </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="py-20 bg-swiss-dark text-swiss-cream relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="flex items-center justify-between mb-12 reveal-text">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">Client Reviews</h2>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-swiss-gold text-swiss-gold" />
                    ))}
                  </div>
                  <span className="text-sm text-swiss-stone ml-2">5.0 • {REVIEWS.length} reviews</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REVIEWS.map((review, index) => (
                <div 
                  key={review.id} 
                  className="reveal-text bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-swiss-gold/50 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-serif text-lg font-semibold">{review.name}</h4>
                      <p className="text-xs text-swiss-stone">{review.location}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-swiss-gold text-swiss-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-swiss-stone leading-relaxed mb-3">{review.text}</p>
                  <p className="text-xs text-swiss-stone/50">{review.date}</p>
                </div>
              ))}
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
          
          <a href={`mailto:${CONTACT_INFO.email}`} className="block font-display text-[8vw] md:text-[6vw] leading-none hover:text-swiss-gold transition-colors duration-500 shine-effect-text">
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