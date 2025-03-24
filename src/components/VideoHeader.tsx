'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Blasen-Komponente für den animierten Hintergrund
const Bubble = ({ size, left, top, delay, duration }: { 
  size: number, 
  left: string, 
  top: string, 
  delay: number,
  duration: number
}) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-10"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.2, 1],
        opacity: [0, 0.2, 0.1],
        y: [0, -150]
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        repeat: Infinity, 
        repeatType: "loop",
        repeatDelay: 2
      }}
    />
  );
};

// Pulsierender Kreis für zusätzliche Bewegung
const PulsingCircle = ({ size, left, top, delay }: { 
  size: number, 
  left: string, 
  top: string, 
  delay: number 
}) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.3, 0.8],
        opacity: [0, 0.3, 0]
      }}
      transition={{ 
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  );
};

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

  // Dynamisch Blasen generieren
  const bubbles = React.useMemo(() => {
    // Weniger Blasen auf Mobilgeräten
    const count = isMobile ? 8 : 15;
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.floor(Math.random() * 180) + 50; // 50-230px
      const left = `${Math.floor(Math.random() * 100)}%`;
      const top = `${Math.floor(Math.random() * 100)}%`;
      const delay = Math.random() * 8;
      const duration = Math.random() * 8 + 8; // 8-16 Sekunden

      return (
        <Bubble 
          key={`bubble-${i}`}
          size={size}
          left={left}
          top={top}
          delay={delay}
          duration={duration}
        />
      );
    });
  }, [isMobile]);

  // Pulsierende Kreise für zusätzliche Bewegung
  const pulsingCircles = React.useMemo(() => {
    const count = isMobile ? 3 : 5;
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.floor(Math.random() * 300) + 200; // 200-500px
      const left = `${Math.floor(Math.random() * 100)}%`;
      const top = `${Math.floor(Math.random() * 100)}%`;
      const delay = Math.random() * 3;

      return (
        <PulsingCircle 
          key={`pulse-${i}`}
          size={size}
          left={left}
          top={top}
          delay={delay}
        />
      );
    });
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animierter Hintergrund mit Blasen */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        
        {/* Statische Elemente im Hintergrund */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Blasen im Hintergrund */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles}
          {pulsingCircles}
        </div>
        
        {/* Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
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
      
      {/* Besser sichtbarer Scroll-Hinweis */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center items-center">
        <motion.div 
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2 font-medium">Mehr entdecken</p>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 