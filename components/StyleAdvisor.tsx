import React, { useState } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import { Sparkles, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StyleAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    
    try {
      const advice = await getStyleAdvice(query);
      setResponse(advice);
    } catch (err) {
      setResponse("Sorry, ik kan de stylist momenteel niet bereiken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2 bg-cocoa-900 text-beige-100 px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-cocoa-800 transition-all border border-cocoa-700 touch-manipulation min-h-[44px] min-w-[44px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Stijl Advies"
      >
        <Sparkles size={18} className="text-gold-500 flex-shrink-0" />
        <span className="font-serif italic tracking-wide text-xs sm:text-sm hidden sm:inline">AI Stijl Advies</span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cocoa-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-beige-50 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-beige-200 p-4 sm:p-6 flex justify-between items-start border-b border-cocoa-900/10 flex-shrink-0">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-cocoa-900 mb-1">Stijl Assistent</h3>
                  <p className="text-[10px] sm:text-xs text-cocoa-700 uppercase tracking-widest">Powered by Gemini AI</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-cocoa-700 hover:text-cocoa-900 transition-colors touch-manipulation p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Sluiten"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <p className="text-cocoa-800 text-xs sm:text-sm leading-relaxed">
                  Weet je niet wat je moet boeken? Beschrijf je haartype (bijv. 4C) en de gelegenheid, en ik raad de perfecte stijl uit mijn menu aan.
                </p>

                {response && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-beige-200 p-3 sm:p-4 rounded-lg border border-cocoa-900/20 text-cocoa-900 text-xs sm:text-sm italic"
                  >
                    "{response}"
                  </motion.div>
                )}

                <form onSubmit={handleConsultation} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="bijv. Ik zoek een protective style voor vakantie..."
                    className="w-full bg-beige-100 border border-cocoa-900/20 rounded-lg py-3 sm:py-3.5 pl-4 pr-12 text-cocoa-900 placeholder-cocoa-600 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-cocoa-700 hover:text-gold-600 disabled:opacity-50 transition-colors p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Versturen"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-cocoa-300 border-t-cocoa-900 rounded-full animate-spin"></div>
                    ) : (
                      <Send size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StyleAdvisor;