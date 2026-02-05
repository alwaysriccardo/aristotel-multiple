import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('de');

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  useEffect(() => {
    // Initialize Google Translate
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'de',
          includedLanguages: 'de,en,fr,it',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Trigger Google Translate
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Floating Language Button */}
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-2">
        
        {/* Language Options */}
        {isOpen && (
          <div className="flex flex-col gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
                  currentLang === lang.code
                    ? 'bg-[#C9A961] text-white'
                    : 'bg-white text-swiss-dark hover:bg-[#E8DCC8]'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-sm whitespace-nowrap">{lang.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-[#C9A961] hover:bg-[#B8954F] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Select Language"
        >
          <Globe size={24} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          
          {/* Current Language Badge */}
          <span className="absolute -top-1 -right-1 bg-white text-[#C9A961] text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-[#C9A961]">
            {currentLang.toUpperCase()}
          </span>
        </button>
      </div>
    </>
  );
};

export default LanguageSelector;
