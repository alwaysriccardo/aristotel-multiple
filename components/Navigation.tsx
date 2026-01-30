import React from 'react';
import { Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
      <div className="font-display font-bold text-lg md:text-xl tracking-tighter">
        ARISTOTEL
      </div>
      
      <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium">
        <a href="#projects" className="hover:text-swiss-gold transition-colors">Projects</a>
        <a href="#services" className="hover:text-swiss-gold transition-colors">Services</a>
        <a href="#contact" className="hover:text-swiss-gold transition-colors">Contact</a>
      </div>
      
      <button className="md:hidden">
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navigation;