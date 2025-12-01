import React, { useState } from 'react';
import { Menu, X, ArrowRight, Star, MapPin, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BRAND_NAME, PRICES, PORTFOLIO, SOCIAL_LINKS, TAGLINE, POLICY_RULES, LOGO_URL } from './constants';
import StyleAdvisor from './components/StyleAdvisor';

// --- Helper Components ---

const SectionHeading: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-10 sm:mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && <span className="block text-gold-600 text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">{subtitle}</span>}
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-cocoa-900 drop-shadow-sm px-2">{title}</h2>
    <div className={`h-1 w-16 sm:w-20 bg-gold-600 mt-4 sm:mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline'; onClick?: () => void; href?: string; className?: string }> = ({ 
  children, variant = 'primary', onClick, href, className = '' 
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 touch-manipulation min-h-[44px]";
  const variants = {
    primary: "bg-gold-500 text-cocoa-900 hover:bg-white hover:text-cocoa-900 active:bg-gold-400",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-cocoa-900 active:bg-gold-500/20"
  };

  const content = (
    <>
      {children}
      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
    </>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]} ${className}`}>{content}</a>;
  }
  return <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>{content}</button>;
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activePriceCategory, setActivePriceCategory] = useState<number | null>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedPriceImageIndex, setSelectedPriceImageIndex] = useState<number | null>(null);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const scrollTo = (id: string) => {
    setIsNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-cocoa-900 bg-beige-100 overflow-x-hidden w-full relative selection:bg-gold-500 selection:text-cocoa-900 min-h-screen">
      <StyleAdvisor />
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-beige-200/95 backdrop-blur-xl border-b border-cocoa-900/10 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Goat Logo - Realistic with gold border */}
            <div className="relative">
              <img 
                src={LOGO_URL} 
                alt="Goat Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-cover rounded-full border border-gold-500/50 shadow-lg" 
              />
            </div>
            <div className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tighter text-cocoa-900">
              HAIR BY THE <span className="text-gold-600">GOAT</span>.
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest uppercase">
            <button onClick={() => scrollTo('about')} className="text-cocoa-900 hover:text-gold-600 transition-colors">Over</button>
            <button onClick={() => scrollTo('portfolio')} className="text-cocoa-900 hover:text-gold-600 transition-colors">Portfolio</button>
            <button onClick={() => scrollTo('pricing')} className="text-cocoa-900 hover:text-gold-600 transition-colors">Prijslijst</button>
            <button 
              onClick={() => scrollTo('book')}
              className="bg-gold-500 text-cocoa-900 px-6 py-3 hover:bg-gold-600 transition-colors"
            >
              Nu Boeken
            </button>
          </div>

          <button className="md:hidden p-3 text-cocoa-900 touch-manipulation" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Menu">
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isNavOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-beige-200 border-t border-cocoa-900/10 px-6 py-6 flex flex-col space-y-4"
          >
            <button onClick={() => scrollTo('about')} className="text-left font-serif text-xl sm:text-2xl text-cocoa-900 py-3 touch-manipulation">Over</button>
            <button onClick={() => scrollTo('portfolio')} className="text-left font-serif text-xl sm:text-2xl text-cocoa-900 py-3 touch-manipulation">Portfolio</button>
            <button onClick={() => scrollTo('pricing')} className="text-left font-serif text-xl sm:text-2xl text-cocoa-900 py-3 touch-manipulation">Prijzen</button>
            <button onClick={() => scrollTo('book')} className="text-left font-serif text-xl sm:text-2xl text-gold-600 font-bold py-3 touch-manipulation">Nu Boeken</button>
          </motion.div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          {/* Using a darker, more texture-focused image for the background */}
          <img 
            src="https://images.unsplash.com/photo-1624637651395-586b97b0a82e?q=80&w=2000&auto=format&fit=crop" 
            alt="Dark Skin Braids Texture" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige-200/40 via-beige-100/20 to-beige-100"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-12 sm:py-16">
          {/* Logo boven EST with love 2025 - subtiel geïntegreerd */}
          <motion.img
            src={LOGO_URL}
            alt="Goat Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-[0.08] mix-blend-soft-light pointer-events-none"
            style={{ filter: 'brightness(1.2) saturate(1.0)' }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-600 tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs md:text-sm font-bold uppercase mb-4 sm:mb-6"
          >
            EST. 2025 with love
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-cocoa-900 mb-6 sm:mb-8 leading-tight sm:leading-none px-2"
          >
            HAIR BY THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-cocoa-900">GOAT</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-cocoa-800 text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
          >
            {TAGLINE}. High-end stitch braids, cornrows, en weaves. 
            <br className="hidden sm:block"/>Strikte precisie voor elke textuur.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
          >
            <Button onClick={() => scrollTo('book')} className="w-full sm:w-auto touch-manipulation">Boek via WhatsApp</Button>
            <Button variant="outline" onClick={() => scrollTo('pricing')} className="w-full sm:w-auto touch-manipulation">Bekijk Prijslijst</Button>
          </motion.div>
        </div>
      </section>

      {/* --- About Section (Beige Theme) --- */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-beige-200 relative">
         {/* Texture graphic */}
         <div className="absolute top-0 left-0 text-[8rem] sm:text-[12rem] md:text-[20rem] font-serif leading-none opacity-[0.03] pointer-events-none select-none text-cocoa-900">GOAT</div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative flex justify-center md:justify-start order-2 md:order-1">
             <div className="absolute top-2 left-2 w-full h-full max-w-xs border border-gold-500/20 rounded-sm z-0"></div>
             <img 
               src="/images/photo_1.jpg" 
               alt="Braiding technique" 
               className="max-w-xs w-full h-auto rounded-sm shadow-xl relative z-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
             />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-gold-600 font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-3 sm:mb-4 block">Over de Specialist</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cocoa-900 mb-6 sm:mb-8 leading-tight">Technische perfectie.<br/>Geen compromissen.</h2>
            <p className="text-cocoa-800 leading-relaxed sm:leading-loose mb-4 sm:mb-6 text-sm sm:text-base">
              Welkom bij <strong>Hair by the GOAT</strong>. Ik ben gespecialiseerd in precisie styling voor Afro en getextureerd haar (4A-4C). 
              Mijn werkruimte is ontworpen voor klanten die kwaliteit boven snelheid waarderen.
            </p>
            <p className="text-cocoa-800 leading-relaxed sm:leading-loose mb-6 sm:mb-8 text-sm sm:text-base">
              Of je nu boekt voor <strong>Stitch Braids</strong> of een <strong>Weave</strong>, verwacht strakke scheidingen, 
              een nette afwerking, en een haarstijl die lang meegaat. Ik neem de tijd om te zorgen dat je edges beschermd blijven en het resultaat vlekkeloos is.
            </p>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {["Stitch Braids Specialist", "Strikte Hygiëne Standaarden", "4C Hair Care Expert"].map((item, i) => (
                <li key={i} className="flex items-center text-cocoa-900">
                  <CheckCircle size={16} className="text-gold-500 mr-3 flex-shrink-0" />
                  <span className="uppercase tracking-wider text-[10px] sm:text-xs font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Portfolio Section (Carousel) --- */}
      <section id="portfolio" className="py-12 sm:py-16 bg-beige-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading title="Het Werk" subtitle="Portfolio" />
          
          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory">
              <div className="flex gap-3 sm:gap-4 justify-start sm:justify-center">
                {PORTFOLIO.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 group relative cursor-pointer touch-manipulation snap-center"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-sm bg-beige-200 border border-gold-500/30">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-cocoa-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
                      <span className="text-gold-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" href={SOCIAL_LINKS[1].url} className="touch-manipulation">Check Instagram voor meer</Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cocoa-900/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-10 sm:-top-12 right-0 text-beige-100 hover:text-gold-400 transition-colors z-10 touch-manipulation p-2 min-h-[44px] min-w-[44px]"
                aria-label="Sluiten"
              >
                <X size={28} className="sm:w-8 sm:h-8" />
              </button>

              {/* Navigation Buttons */}
              {PORTFOLIO.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex! - 1 + PORTFOLIO.length) % PORTFOLIO.length)}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-cocoa-900/90 hover:bg-cocoa-800 text-beige-100 p-3 sm:p-4 rounded-full transition-all z-10 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Vorige"
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex! + 1) % PORTFOLIO.length)}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-cocoa-900/90 hover:bg-cocoa-800 text-white p-3 sm:p-4 rounded-full transition-all z-10 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Volgende"
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Large Image */}
              <div className="relative rounded-sm overflow-hidden border border-gold-500/30">
                <img
                  src={PORTFOLIO[selectedImageIndex].image}
                  alt={PORTFOLIO[selectedImageIndex].title}
                  className="w-full h-auto max-h-[85vh] sm:max-h-[90vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cocoa-900/90 to-transparent p-4 sm:p-6">
                  <span className="text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 block">
                    {PORTFOLIO[selectedImageIndex].category}
                  </span>
                  <h3 className="text-white font-serif text-lg sm:text-2xl md:text-3xl">
                    {PORTFOLIO[selectedImageIndex].title}
                  </h3>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 text-beige-200 text-xs sm:text-sm">
                {selectedImageIndex + 1} / {PORTFOLIO.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price List Image Popup Modal */}
      <AnimatePresence>
        {selectedPriceImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cocoa-900/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPriceImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPriceImageIndex(null)}
                className="absolute -top-10 sm:-top-12 right-0 text-beige-100 hover:text-gold-400 transition-colors z-10 touch-manipulation p-2 min-h-[44px] min-w-[44px]"
                aria-label="Sluiten"
              >
                <X size={28} className="sm:w-8 sm:h-8" />
              </button>

              {/* Large Image */}
              <div className="relative rounded-sm overflow-hidden border border-gold-500/30">
                <img
                  src={PRICES[selectedPriceImageIndex].image}
                  alt={PRICES[selectedPriceImageIndex].title}
                  className="w-full h-auto max-h-[85vh] sm:max-h-[90vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cocoa-900/90 to-transparent p-4 sm:p-6">
                  <p className="text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">
                    Voorbeeld
                  </p>
                  <h3 className="text-white font-serif text-lg sm:text-2xl md:text-3xl">
                    {PRICES[selectedPriceImageIndex].title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Pricing Section (Interactive Split View) --- */}
      <section id="pricing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-beige-50 relative border-y border-cocoa-900/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Prijslijst" subtitle="Investering" />

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-start">
            
            {/* Left Column: List */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {PRICES.map((category, idx) => (
                <div 
                  key={idx} 
                  className={`border border-cocoa-900/10 transition-all duration-300 rounded-sm overflow-hidden ${activePriceCategory === idx ? 'bg-beige-200 border-gold-500/50' : 'bg-beige-100 hover:bg-beige-200'}`}
                >
                  <button 
                    onClick={() => setActivePriceCategory(activePriceCategory === idx ? null : idx)}
                    className="w-full text-left p-4 sm:p-6 md:p-8 flex justify-between items-center group touch-manipulation min-h-[60px]"
                  >
                    <h3 className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl transition-colors pr-4 ${activePriceCategory === idx ? 'text-gold-600' : 'text-cocoa-900 group-hover:text-gold-600'}`}>
                      {category.title}
                    </h3>
                    <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ${activePriceCategory === idx ? 'bg-gold-500 text-cocoa-900 border-gold-500' : 'border-cocoa-700 text-cocoa-700'}`}>
                      <ArrowRight size={14} className={`transform transition-transform ${activePriceCategory === idx ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  
                  {/* Accordion Content for Mobile (visible always if active) */}
                  <AnimatePresence>
                    {activePriceCategory === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-cocoa-900/10"
                      >
                         {/* Mobile Image (Only shows on small screens) */}
                         <div 
                           className="lg:hidden h-48 w-full overflow-hidden relative cursor-pointer group"
                           onClick={() => setSelectedPriceImageIndex(idx)}
                         >
                           <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/80 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                             <div>
                               <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">Voorbeeld</p>
                               <h3 className="text-white font-serif text-lg">{category.title}</h3>
                             </div>
                             <div className="bg-gold-500 text-cocoa-900 px-3 py-1 rounded-sm">
                               <span className="text-xs font-bold uppercase">Tap</span>
                             </div>
                           </div>
                         </div>

                        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                          {category.items.map((service, sIdx) => (
                            <div key={sIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between group gap-2 sm:gap-0">
                              <div className="mb-1 sm:mb-0 flex-1">
                                <span className="font-bold text-base sm:text-lg text-cocoa-900 group-hover:text-gold-600 transition-colors block">{service.name}</span>
                                {service.description && (
                                  <p className="text-[10px] sm:text-xs text-cocoa-700 mt-1">{service.description}</p>
                                )}
                              </div>
                              <div className="flex-grow mx-2 sm:mx-4 hidden sm:block border-b border-cocoa-700 border-dotted relative top-[-4px]"></div>
                              <span className="font-serif text-lg sm:text-xl text-cocoa-900 whitespace-nowrap">{service.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Column: Sticky Image Preview (Desktop Only) */}
            {activePriceCategory !== null && (
              <div className="hidden lg:block lg:col-span-5 sticky top-32">
                <div 
                  className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
                  onClick={() => setSelectedPriceImageIndex(activePriceCategory)}
                >
                   <AnimatePresence mode="wait">
                      <motion.img 
                        key={activePriceCategory}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={PRICES[activePriceCategory].image} 
                        alt="Category Preview" 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                   </AnimatePresence>
                   {/* Overlay Text */}
                   <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-8">
                      <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Voorbeeld</p>
                      <h3 className="text-white font-serif text-3xl">{PRICES[activePriceCategory].title}</h3>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-400/50 px-3 py-1 rounded-sm inline-block">
                          Klik voor grotere weergave
                        </span>
                      </div>
                   </div>
                </div>
              </div>
            )}

          </div>

          {/* Policy Rules Box */}
          <div className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-beige-200 rounded-sm border-l-4 border-gold-500">
            <h4 className="font-serif text-lg sm:text-xl text-cocoa-900 mb-4 sm:mb-6">Belangrijke Informatie</h4>
            <ul className="space-y-3 sm:space-y-4">
              {POLICY_RULES.map((rule, idx) => (
                <li key={idx} className="flex items-start text-cocoa-800 text-xs sm:text-sm leading-relaxed">
                  <span className="text-gold-500 mr-3 mt-1 text-xs flex-shrink-0">●</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Booking Section --- */}
      <section id="book" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-beige-100">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeading title="Afspraak Maken" subtitle="Contact" />
          
          <div className="bg-beige-200/80 p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-cocoa-900/10">
            <p className="text-base sm:text-lg md:text-xl text-cocoa-900 mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-2">
              Om je plekje vast te leggen, stuur een bericht via WhatsApp, Instagram of Snapchat.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {SOCIAL_LINKS.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 rounded-lg transition-all hover:-translate-y-2 hover:shadow-2xl active:scale-95 touch-manipulation min-h-[140px] ${link.color}`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <Icon size={32} className="sm:w-10 sm:h-10 mb-3 sm:mb-4" />
                      <span className="font-bold text-base sm:text-lg">{link.label}</span>
                      <span className="text-[10px] sm:text-xs opacity-80 mt-2 uppercase tracking-wider">Klik om te openen</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-beige-200 text-cocoa-800 py-12 sm:py-16 px-4 sm:px-6 border-t border-cocoa-900/10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-sm">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                 {/* Realistic Goat Head Logo in Footer */}
                 <img src={LOGO_URL} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-full border border-gold-500/30" />
                <div className="font-serif text-lg sm:text-xl md:text-2xl text-cocoa-900">HAIR BY THE <span className="text-gold-600">GOAT</span>.</div>
            </div>
            
            <p className="max-w-md mb-4 sm:mb-6 leading-relaxed text-cocoa-800 text-xs sm:text-sm">
              De standaard voor stitch braids en luxe cornrows. 
              Altijd netjes. Altijd met precisie.
            </p>
          </div>
          
          <div>
            <h4 className="text-cocoa-900 font-bold uppercase tracking-widest mb-4 sm:mb-6 text-[10px] sm:text-xs">Studio Info</h4>
            <div className="space-y-3 sm:space-y-4 text-cocoa-800 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Privé Studio aan Huis<br/>Adres volgt na bevestiging</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Ma - Za<br/>Alleen op afspraak</span>
              </div>
            </div>
          </div>

          <div>
             <h4 className="text-cocoa-900 font-bold uppercase tracking-widest mb-4 sm:mb-6 text-[10px] sm:text-xs">Menu</h4>
             <ul className="space-y-2 text-xs sm:text-sm">
               <li><button onClick={() => scrollTo('portfolio')} className="hover:text-gold-500 transition-colors touch-manipulation py-1">Portfolio</button></li>
               <li><button onClick={() => scrollTo('pricing')} className="hover:text-gold-500 transition-colors touch-manipulation py-1">Prijslijst</button></li>
               <li><button onClick={() => scrollTo('book')} className="hover:text-gold-500 transition-colors touch-manipulation py-1">Contact</button></li>
             </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-cocoa-900/10 text-center text-[10px] sm:text-xs uppercase tracking-widest text-cocoa-700 px-4">
          &copy; {new Date().getFullYear()} Hair by the GOAT. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default App;