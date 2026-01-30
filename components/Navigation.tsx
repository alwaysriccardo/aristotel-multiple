import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[60] text-white">
        <div className={`font-display font-bold text-lg md:text-xl tracking-tighter ${!isMenuOpen ? 'mix-blend-difference' : ''}`}>
          ARISTOTEL
        </div>
        
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium mix-blend-difference">
          <a href="#projects" className="hover:text-swiss-gold transition-colors">Projects</a>
          <a href="#services" className="hover:text-swiss-gold transition-colors">Services</a>
          <a href="#contact" className="hover:text-swiss-gold transition-colors">Contact</a>
        </div>
        
        <button 
          className={`md:hidden relative transition-all duration-300 ${!isMenuOpen ? 'mix-blend-difference' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-swiss-dark z-[55] md:hidden transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12 text-swiss-cream">
          <a 
            href="#projects" 
            className="font-display text-4xl hover:text-swiss-gold transition-colors tracking-tight"
            onClick={handleLinkClick}
          >
            PROJECTS
          </a>
          <a 
            href="#services" 
            className="font-display text-4xl hover:text-swiss-gold transition-colors tracking-tight"
            onClick={handleLinkClick}
          >
            SERVICES
          </a>
          <a 
            href="#contact" 
            className="font-display text-4xl hover:text-swiss-gold transition-colors tracking-tight"
            onClick={handleLinkClick}
          >
            CONTACT
          </a>
          
          {/* Decorative Element */}
          <div className="absolute bottom-20 text-center">
            <p className="font-serif text-sm italic text-swiss-stone">Aristotel Multiple</p>
            <p className="text-xs text-swiss-stone/50 mt-2 tracking-wider">Swiss Excellence</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;