'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VideoHeader() {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Mobile-Check mit verbesserten Breakpoints
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video-Hintergrund mit vereinfachtem Setup */}
      <div className="absolute inset-0 bg-gray-900">
        {/* Inline Hintergrundsvideo statt iframe für bessere Mobilkompatibilität */}
        <div className="absolute inset-0 overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className={`object-cover w-full h-full ${isMobile ? 'object-center scale-150' : 'object-center scale-110'}`}
            poster="/images/video-poster.jpg"
          >
            <source src="https://player.vimeo.com/progressive_redirect/playback/1068958527/rendition/1080p/file.mp4?loc=external" type="video/mp4" />
            {/* Fallback für Browser, die das Video nicht unterstützen */}
            Ihr Browser unterstützt keine HTML5-Videos.
          </video>
        </div>
        
        {/* Overlay mit verbessertem Farbverlauf für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/90"></div>
      </div>

      {/* Content mit verbesserter Positionierung */}
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
      
      {/* Scroll-Hinweis mit korrigierter Position für alle Geräte */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center items-center">
        <motion.div 
          className="text-white text-center"
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
    </div>
  );
} 