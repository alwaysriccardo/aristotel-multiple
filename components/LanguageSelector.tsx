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
  const [isLoaded, setIsLoaded] = useState(false);

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    };

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
      setIsLoaded(true);
    };

    addScript();
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Wait for Google Translate to be ready
    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        clearInterval(interval);
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Force reload if needed
        setTimeout(() => {
          const frame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
          if (frame) {
            const doc = frame.contentDocument || frame.contentWindow?.document;
            if (doc) {
              const langOption = doc.querySelector(`[data-lang-code="${langCode}"]`) as HTMLElement;
              if (langOption) {
                langOption.click();
              }
            }
          }
        }, 100);
      }
    }, 100);

    // Clear interval after 3 seconds if not found
    setTimeout(() => clearInterval(interval), 3000);
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', visibility: 'hidden' }}></div>

      {/* Floating Language Button - Positioned between menu and contact buttons */}
      <div className="fixed top-20 right-6 md:top-24 md:right-8 z-50">
        
        {/* Language Options */}
        {isOpen && (
          <div className="absolute top-16 right-0 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
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
          className="group relative bg-[#C9A961] hover:bg-[#B8954F] text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Select Language"
        >
          <Globe size={20} className={`md:w-6 md:h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          
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
