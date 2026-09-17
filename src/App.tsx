/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PageRoute, Pizza } from './types';
import { Check, Flame } from 'lucide-react';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    if (['home', 'menu', 'about', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [selectedPizzaModal, setSelectedPizzaModal] = useState<Pizza | null>(null);
  const { lastAddedItem } = useCart();

  // Keep hash in sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'menu', 'about', 'contact'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#fbf8f3] selection:bg-orange-500 selection:text-stone-950 flex flex-col font-sans">
      {/* Sticky Navbar */}
      <Navbar activeRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Routed Page Content with Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentRoute === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <HomePage
                onNavigate={navigateTo}
                onOpenDetails={(pizza) => setSelectedPizzaModal(pizza)}
              />
            </motion.div>
          )}

          {currentRoute === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <MenuPage
                onOpenDetails={(pizza) => setSelectedPizzaModal(pizza)}
              />
            </motion.div>
          )}

          {currentRoute === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <AboutPage onNavigate={navigateTo} />
            </motion.div>
          )}

          {currentRoute === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <ContactPage onNavigate={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Product Customizer Modal */}
      <ProductModal
        pizza={selectedPizzaModal}
        onClose={() => setSelectedPizzaModal(null)}
      />

      {/* Cart Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Toast Notification when adding an item */}
      <AnimatePresence>
        {lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-900/95 border border-orange-500/50 text-[#fbf8f3] shadow-2xl shadow-black/80 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
              Added <strong className="text-orange-400">{lastAddedItem}</strong> to your order!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
