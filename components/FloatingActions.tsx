import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group floating-btn bg-[#25D366] hover:bg-[#1fb855] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 shine-effect"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Email Button */}
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="group floating-btn bg-swiss-gold hover:bg-[#b89448] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 shine-effect"
        aria-label="Email"
      >
        <Mail className="w-6 h-6" />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="group floating-btn bg-swiss-dark hover:bg-black text-swiss-cream w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 shine-effect"
        aria-label="Phone"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingActions;
