'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from './Footer';
import { CartProvider } from './shop/CartProvider';

interface ShopLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function ShopLayout({ children, showHeader = false }: ShopLayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#111827]">
        {/* Shop-Header, nur wenn showHeader true ist */}
        {showHeader && (
          <header className="bg-[#111827] border-b border-gray-800 sticky top-0 z-10 py-4">
            <div className="container mx-auto px-8">
              <div className="flex justify-between items-center">
                <Link href="/shop" className="text-2xl font-bold text-[#6366F1] hover:text-violet-400 transition">
                  NEUJE Shop
                </Link>
                
                <div className="flex items-center space-x-8">
                  <Link href="/shop" className="text-white hover:text-[#6366F1] transition">
                    Produkte
                  </Link>
                  <Link href="/shop/cart" className="text-white hover:text-[#6366F1] transition">
                    Warenkorb
                  </Link>
                  <Link href="/" className="text-white hover:text-[#6366F1] transition">
                    Zurück zur Website
                  </Link>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Hauptinhalt */}
        <motion.main 
          className="flex-grow py-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            {children}
          </div>
        </motion.main>

        {/* Shop-Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
} 