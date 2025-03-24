'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function VideoHeader() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);
  const [isVideoError, setIsVideoError] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [placeholderVisible, setPlaceholderVisible] = React.useState(true);
  
  // Optimierter, einfacher Hintergrund-Gradient (kein Bild) als Basis-Fallback
  const fallbackStyle = {
    backgroundImage: 'linear-gradient(to right, #4F46E5, #7C3AED)',
  };

  // Logo als Platzhalter (kein externes Bild das manchmal laden könnte und manchmal nicht)
  const placeholderUrl = '/logo.svg';

  // Mobile Video Fix Styles
  const mobileVideoStyle = {
    width: '100vh',
    height: '100vw',
    transform: 'translate(-50%, -50%) rotate(90deg) scale(1.5)'
  };

  // Verbesserte Mobile-Styles für Hochformat-Videos
  const mobilePortraitVideoStyle = {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover' as const,
    transform: 'translate(-50%, -50%) scale(1.2)'
  };

  React.useEffect(() => {
    // Direktes Anzeigen des Fallback-Hintergrunds
    setIsLoaded(true);
    
    // Prüfen, ob es sich um ein mobiles Gerät handelt
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial und bei Resize-Events prüfen
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Video erst laden, wenn die Seite vollständig geladen ist
    const loadVideo = () => {
      // Verzögere das Video-Laden, um andere kritische Ressourcen zu priorisieren
      setTimeout(() => setShouldLoadVideo(true), 100);
    };
    
    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo);
    }
    
    // Längerer Timeout, um bei sehr langsamen Verbindungen das Video komplett zu überspringen
    const errorTimeout = setTimeout(() => {
      if (!videoReady) {
        setIsVideoError(true);
        console.warn("Video konnte nicht rechtzeitig geladen werden - Fallback wird dauerhaft angezeigt");
      }
    }, 12000); // Noch längere Wartezeit
    
    return () => {
      clearTimeout(errorTimeout);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('load', loadVideo);
    };
  }, [videoReady]);

  // Video-Parameter für optimale Performance
  const getVideoParams = () => {
    // Niedrigere Qualität für mobile Geräte
    const quality = isMobile ? '540p' : '720p';
    
    // Verzögerte Autoplay-Parameter erst setzen, wenn Video geladen werden soll
    return shouldLoadVideo 
      ? `autoplay=1&loop=1&background=1&muted=1&controls=0&quality=${quality}&playsinline=1&dnt=1` 
      : `autoplay=0&loop=1&background=1&muted=1&controls=0&quality=${quality}&playsinline=1&dnt=1`;
  };

  // Handler für erfolgreichen Video-Load
  const handleVideoLoaded = () => {
    // Erst nach einer Verzögerung das Video einblenden
    setTimeout(() => {
      setVideoReady(true);
      // Sanftes Ausblenden des Platzhalters
      setTimeout(() => {
        setPlaceholderVisible(false);
      }, 500);
    }, 200);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video-Hintergrund */}
      <div className="absolute inset-0 z-0">
        {/* Fallback-Gradient, IMMER sichtbar mit angepasster Deckkraft */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            ...fallbackStyle,
            opacity: videoReady ? 0.2 : 1
          }}
        />
        
        {/* Statischer Platzhalter wird nur angezeigt, wenn nötig */}
        {placeholderVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-800 to-purple-800"
               style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 1s ease-out' }}>
            <div className="w-32 h-32 animate-pulse">
              <Image 
                src={placeholderUrl}
                alt="Logo" 
                width={128}
                height={128}
                priority
              />
            </div>
          </div>
        )}
        
        {/* Vimeo-Video Container - IMMER im DOM, aber versteckt wenn nicht bereit */}
        <div className="w-full h-full overflow-hidden" 
             style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1s ease-in' }}>
          <div className="absolute inset-0 scale-110">
            {shouldLoadVideo && (
              <iframe
                src={`https://player.vimeo.com/video/1068958527?${getVideoParams()}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen"
                title="Hintergrundvideo"
                onLoad={handleVideoLoaded}
                onError={() => {
                  console.error("Video konnte nicht geladen werden");
                  setIsVideoError(true);
                }}
                style={{ 
                  width: '100%',
                  height: isMobile ? '100%' : '120%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: isMobile ? 
                    'translate(-50%, -50%) scale(1.2)' : 
                    'translate(-50%, -50%) scale(1.2)',
                  ...(isMobile ? mobilePortraitVideoStyle : {})
                }}
              ></iframe>
            )}
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