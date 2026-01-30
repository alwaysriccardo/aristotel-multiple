import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Mail, Phone, MapPin, ArrowRight, Star, MessageCircle } from 'lucide-react';

import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import FloatingActions from './components/FloatingActions';
import { CONTACT_INFO, LOCATIONS, RENOVATION_SERVICES, CLEANING_SERVICES, FEATURED_PROJECTS, CLEANING_PROJECTS, REVIEWS } from './constants';

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
          <div className="absolute inset-0 w-full h-full bg-black/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
            alt="Luxury Swiss Interior" 
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 text-center text-swiss-cream mix-blend-difference px-4 max-w-6xl mx-auto">
            <h1 className="font-serif text-[5vw] md:text-[3.5vw] leading-tight tracking-wide italic reveal-text">
              "WE ARE WHAT WE REPEATEDLY DO. EXCELLENCE, THEN, IS NOT AN ACT, BUT A HABIT."
            </h1>
            <div className="mt-8 flex flex-col items-center reveal-text delay-300">
              <p className="font-display text-sm md:text-base tracking-[0.3em] uppercase">— ARISTOTLE</p>
              <div className="h-16 w-px bg-white/50 mt-8 mb-4"></div>
              <ArrowDown className="animate-bounce" />
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-32 px-6 md:px-20 max-w-[1800px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight reveal-text text-swiss-dark">
              YOUR TRUSTED <br />
              <span className="text-swiss-gold italic font-serif">Renovation Partner</span>
            </h2>
          </div>
          <div className="font-body text-xl font-light leading-relaxed text-swiss-stone space-y-8 reveal-text">
            <p>
              Operating across Switzerland, we provide professional renovation and cleaning services 
              for residential and commercial properties. Our experienced team delivers quality workmanship 
              on time and within budget.
            </p>
            <p>
              From full apartment renovations to post-construction cleaning, we handle projects of all sizes. 
              Licensed, insured, and committed to getting the job done right.
            </p>
            <div className="flex gap-4 items-center text-swiss-dark font-medium uppercase tracking-widest text-sm pt-8">
              <span>Est. 2024</span>
              <span className="w-2 h-2 rounded-full bg-swiss-gold"></span>
              <span>Licensed & Insured</span>
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
            <span className="text-xs uppercase tracking-[0.3em] text-swiss-gold">Recent Work</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4">Completed Projects</h2>
          </div>

          <div className="max-w-6xl mx-auto pb-20">
            {FEATURED_PROJECTS.map((project, index) => (
              <div key={project.id} className="card-item sticky top-24 md:top-32 h-[70vh] w-full flex items-center justify-center mb-12">
                <div className="card-inner w-full md:w-[90%] h-full bg-[#D4C5B0] border border-[#C4B5A0]/30 grid md:grid-cols-2 overflow-hidden shadow-2xl relative group">
                  <div className="p-8 md:p-12 flex flex-col justify-between z-10 bg-[#D4C5B0]">
                    <div>
                      <span className="font-display text-6xl md:text-8xl opacity-10 absolute top-4 left-6 text-[#8B7355]">{project.id}</span>
                      <h3 className="font-serif text-3xl md:text-4xl italic mt-12 mb-2 text-swiss-dark">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.categories.map(cat => (
                          <span key={cat} className="text-[10px] uppercase tracking-wider border border-swiss-dark/20 px-2 py-1 rounded-full text-swiss-dark/60">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#6B5D4F] font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <a 
                      href="#contact"
                      className="flex items-center gap-4 text-swiss-dark uppercase tracking-widest text-xs group-hover:gap-6 transition-all mt-8 shine-effect px-4 py-2 border border-swiss-dark/30 rounded-full hover:bg-swiss-dark/10"
                    >
                      Get a Free Quote <ArrowRight size={16} />
                    </a>
                  </div>
                  <div className="h-full w-full overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RENOVATION SERVICES */}
        <section id="services" className="py-20 px-6 md:px-20 bg-[#E8E6E1] text-swiss-dark relative overflow-hidden">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-swiss-gold/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-swiss-dark/5 rounded-full blur-3xl"></div>
           
           <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-12 reveal-text">
               <span className="text-xs uppercase tracking-[0.3em] text-swiss-gold">What We Do</span>
               <h2 className="font-display text-3xl md:text-4xl mt-4">Renovation Services</h2>
             </div>

             <div className="reveal-text grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
               {RENOVATION_SERVICES.map((service, i) => (
                 <div 
                   key={i} 
                   className="group cursor-none bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-swiss-dark/5 md:hover:border-swiss-gold/50 shadow-sm md:hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 flex flex-col items-center justify-center text-center min-h-[120px] relative overflow-hidden"
                 >
                   {/* Animated background - desktop only */}
                   <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-swiss-gold/0 to-swiss-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   {/* Number badge */}
                   <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-swiss-gold/20 flex items-center justify-center md:group-hover:bg-swiss-gold/40 transition-colors">
                     <span className="text-[10px] font-display text-swiss-dark font-bold">
                       {String(i + 1).padStart(2, '0')}
                     </span>
                   </div>
                   
                   {/* Service name */}
                   <span className="text-sm font-serif italic text-swiss-dark md:text-swiss-stone md:group-hover:text-swiss-dark transition-colors duration-300 leading-tight relative z-10">
                     {service}
                   </span>
                   
                   {/* Bottom accent line - desktop only */}
                   <div className="hidden md:block absolute bottom-0 left-0 h-1 w-0 bg-swiss-gold group-hover:w-full transition-all duration-500"></div>
                 </div>
               ))}
             </div>

             {/* Call to action */}
             <div className="text-center mt-12 reveal-text">
               <p className="font-body text-swiss-stone text-sm max-w-xl mx-auto mb-8">
                 All work performed by experienced professionals. Free quotes available.
               </p>
               <a
                 href={`mailto:${CONTACT_INFO.email}?subject=Renovation Quote Request`}
                 className="inline-flex items-center gap-3 bg-swiss-gold hover:bg-[#b89448] text-white font-display text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 shine-effect group"
               >
                 Get a Quote
                 <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
               </a>
             </div>
           </div>
        </section>

        {/* CLEANING SERVICES SHOWCASE */}
        <section className="py-32 px-6 md:px-20 bg-swiss-cream text-swiss-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal-text">
              <span className="text-xs uppercase tracking-[0.3em] text-swiss-gold">Professional Cleaning</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4">Cleaning Services</h2>
              <p className="font-body text-swiss-stone mt-6 max-w-2xl mx-auto">
                Thorough cleaning services for residential and commercial properties. From routine maintenance to deep post-construction cleanup.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {CLEANING_PROJECTS.map((project, index) => (
                <div 
                  key={project.id}
                  className="reveal-text group cursor-none bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-swiss-gold text-swiss-dark font-display text-sm px-4 py-2 rounded-full">
                      {project.id}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="font-serif text-2xl md:text-3xl italic mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.map(cat => (
                        <span key={cat} className="text-[10px] uppercase tracking-wider border border-swiss-dark/20 px-3 py-1 rounded-full text-swiss-stone">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <p className="text-swiss-stone leading-relaxed">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cleaning Services List */}
            <div className="mt-20 bg-gradient-to-br from-swiss-dark to-black text-swiss-cream rounded-3xl p-12 md:p-16 reveal-text">
              <h3 className="font-display text-3xl md:text-4xl mb-8 text-center">What We Clean</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {CLEANING_SERVICES.map((service, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-none">
                    <div className="w-3 h-3 rounded-full bg-swiss-gold group-hover:scale-150 transition-transform"></div>
                    <span className="text-lg md:text-xl font-serif italic text-swiss-stone group-hover:text-swiss-cream transition-colors">
                      {service}
                    </span>
                  </div>
                ))}
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
                  <span className="text-sm text-swiss-stone ml-2">4.9 • 44+ 5-star reviews</span>
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
      <footer id="contact" className="footer-sticky fixed bottom-0 left-0 w-full h-screen z-0 bg-[#E8DCC8] text-swiss-dark flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2400&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#E8DCC8]/95 to-[#D4C5B0]/95"></div>
        </div>

        <div className="footer-content relative z-10 px-4 w-full max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
            
            {/* Left Column: Contact Button (mobile only) + Form */}
            <div className="space-y-6 md:space-y-0">
              {/* Contact Us Button - Mobile Only */}
              <div className="text-center md:hidden">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-[#8B7355]">Request a Free Quote</p>
                
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="inline-block font-display text-[9vw] sm:text-[8vw] leading-none text-swiss-dark hover:text-swiss-gold transition-all duration-300 mb-3 relative overflow-hidden group/btn cursor-pointer active:scale-95"
                  style={{
                    textShadow: '1px 1px 0px rgba(197, 160, 89, 0.3), 2px 2px 0px rgba(197, 160, 89, 0.2), 3px 3px 0px rgba(197, 160, 89, 0.1)',
                    transform: 'translateZ(0)',
                  }}
                >
                  <span 
                    className="inline-block relative z-10 transition-transform duration-300 group-hover/btn:translate-y-[-4px]"
                    style={{
                      filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))',
                    }}
                  >
                    CONTACT US
                  </span>
                  <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </a>
                
                <p className="text-xs font-serif italic text-[#6B5D4F] animate-pulse">
                  Click to get your personalized quote today →
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white/60 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-swiss-dark/10 shadow-lg">
                <h3 className="font-display text-lg md:text-2xl text-swiss-dark mb-4 md:mb-6">Quick Contact</h3>
                <form className="space-y-3 md:space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/80 border border-swiss-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-swiss-gold focus:border-transparent transition-all text-swiss-dark placeholder:text-[#8B7355]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/80 border border-swiss-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-swiss-gold focus:border-transparent transition-all text-swiss-dark placeholder:text-[#8B7355]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/80 border border-swiss-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-swiss-gold focus:border-transparent transition-all text-swiss-dark placeholder:text-[#8B7355]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={3}
                      className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base bg-white/80 border border-swiss-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-swiss-gold focus:border-transparent transition-all text-swiss-dark placeholder:text-[#8B7355] resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-swiss-gold hover:bg-[#b89448] text-white font-display text-xs md:text-sm uppercase tracking-wider py-2.5 md:py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 shine-effect"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Contact Information + Contact Button (desktop) */}
            <div className="space-y-5 md:space-y-8">
              <div className="flex items-start gap-3 md:gap-4 group">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-swiss-gold/20 rounded-full flex items-center justify-center hover:bg-swiss-gold hover:scale-110 transition-all duration-300 cursor-pointer group-hover:rotate-12"
                >
                  <Phone className="text-swiss-dark w-4 h-4 md:w-5 md:h-5" />
                </a>
                <div className="min-w-0 flex-1">
                  <p className="font-serif italic text-base md:text-xl text-swiss-dark mb-1">Phone</p>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-[#6B5D4F] hover:text-swiss-dark transition-colors text-sm md:text-lg">{CONTACT_INFO.phone}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:gap-4 group">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-swiss-gold/20 rounded-full flex items-center justify-center hover:bg-swiss-gold hover:scale-110 transition-all duration-300 cursor-pointer group-hover:rotate-12"
                >
                  <Mail className="text-swiss-dark w-4 h-4 md:w-5 md:h-5" />
                </a>
                <div className="min-w-0 flex-1">
                  <p className="font-serif italic text-base md:text-xl text-swiss-dark mb-1">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#6B5D4F] hover:text-swiss-dark transition-colors text-sm md:text-lg break-all">{CONTACT_INFO.email}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-swiss-gold/20 rounded-full flex items-center justify-center">
                  <MapPin className="text-swiss-dark w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif italic text-base md:text-xl text-swiss-dark mb-1">Service Areas</p>
                  <p className="text-[#6B5D4F] text-sm md:text-lg leading-relaxed">
                    Zürich • Aargau • Basel<br/>
                    Zug • Luzern • Bern
                  </p>
                </div>
              </div>

              {/* Contact Us Button - Desktop Only */}
              <div className="hidden md:block text-right mt-12">
                <p className="text-sm uppercase tracking-[0.4em] mb-6 text-[#8B7355]">Request a Free Quote</p>
                
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="inline-block font-display text-[5vw] leading-none text-swiss-dark hover:text-swiss-gold transition-all duration-300 mb-4 relative overflow-hidden group/btn cursor-pointer active:scale-95"
                  style={{
                    textShadow: '1px 1px 0px rgba(197, 160, 89, 0.3), 2px 2px 0px rgba(197, 160, 89, 0.2), 3px 3px 0px rgba(197, 160, 89, 0.1)',
                    transform: 'translateZ(0)',
                  }}
                >
                  <span 
                    className="inline-block relative z-10 transition-transform duration-300 group-hover/btn:translate-y-[-4px]"
                    style={{
                      filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))',
                    }}
                  >
                    CONTACT US
                  </span>
                  <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </a>
                
                <p className="text-base font-serif italic text-[#6B5D4F] animate-pulse">
                  Click to get your personalized quote today →
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 md:mt-20 text-[10px] uppercase tracking-widest text-[#8B7355]/50">
            © {new Date().getFullYear()} Aristotel Multiple. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;