// Hilfsdeklarationen für Module ohne Typdefinitionen

declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'next/image';
declare module 'next/link';
declare module 'next/navigation';
declare module 'next/server';
declare module 'next/font/google';
declare module 'next/headers';
declare module 'framer-motion';
declare module 'lucide-react';
declare module 'stripe';
declare module 'zustand';
declare module 'zustand/middleware'; 