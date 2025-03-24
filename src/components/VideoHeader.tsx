'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VideoHeader() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isVideoError, setIsVideoError] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Fallback-Hintergrund, falls das Video nicht geladen werden kann
  const fallbackStyle = {
    backgroundImage: 'linear-gradient(to right, #4F46E5, #7C3AED)',
  };

  // Mobile Video Fix Styles
  const mobileVideoStyle = {
    width: '100vh',
    height: '100vw',
    transform: 'translate(-50%, -50%) rotate(90deg) scale(1.5)'
  };

  React.useEffect(() => {
    // Prüfen, ob es sich um ein mobiles Gerät handelt
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Direktes Laden des Hintergrunds, während das Video noch lädt
    setIsLoaded(true);
    
    // Initial und bei Resize-Events prüfen
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Timeout für den Fall, dass das Video zu lange zum Laden braucht
    const videoTimeout = setTimeout(() => {
      if (!isLoaded) {
        setIsVideoError(true);
        console.warn("Video lädt langsam oder ist nicht verfügbar - Fallback wird angezeigt");
      }
    }, 5000);
    
    return () => {
      clearTimeout(videoTimeout);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video-Hintergrund */}
      <div className="absolute inset-0 z-0">
        {/* Fallback-Bild/Gradient, das sofort angezeigt wird */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transition-opacity duration-1000"
          style={{
            ...fallbackStyle,
            opacity: isVideoError || !isLoaded ? 1 : 0.2
          }}
        ></div>
        
        {/* Vimeo-Video Container */}
        <div className="w-full h-full overflow-hidden">
          <div className="absolute inset-0 scale-110">
            <iframe
              src={`https://player.vimeo.com/video/1067507561?autoplay=1&loop=1&background=1&muted=1&controls=0&quality=${isMobile ? '540p' : '720p'}&playsinline=1&dnt=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Hintergrundvideo"
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsVideoError(true)}
              style={{ 
                width: '100%',
                height: isMobile ? '100%' : '120%',
                objectFit: 'cover',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isMobile ? 
                  'translate(-50%, -50%) scale(1.5)' : 
                  'translate(-50%, -50%) scale(1.2)',
                zIndex: 1,
                ...(isMobile ? mobileVideoStyle : {})
              }}
            ></iframe>
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" style={{ zIndex: 2 }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Wir gestalten Ihre <span className="text-blue-400">digitale Zukunft</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-200">
            Professionelle Webentwicklung mit modernen Technologien 
            und kreativem Design für Ihren Erfolg im Internet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors flex items-center justify-center group">
              Unsere Dienste
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold rounded-full transition-colors">
              Kontakt aufnehmen
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll-Hinweis */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm mb-2">Mehr entdecken</p>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
} 