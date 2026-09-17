import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Flame, Menu, X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute, onNavigate }) => {
  const { openCart, totalItems, lastAddedItem, favorites } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);

  // Monitor scroll for compact navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge when an item is added
  useEffect(() => {
    if (lastAddedItem) {
      setBadgeBump(true);
      const timer = setTimeout(() => setBadgeBump(false), 600);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#0c0a09]/92 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl shadow-black/50'
            : 'py-4 sm:py-5 bg-gradient-to-b from-[#0c0a09]/90 to-transparent backdrop-blur-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Wordmark */}
            <motion.button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-950/50 group-hover:shadow-orange-700/40 transition-shadow">
                <Flame className="w-5 h-5 text-stone-950 fill-stone-950 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#fbf8f3] font-display flex items-center">
                  Cinettov<span className="text-orange-500">Pizza</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 group-hover:text-amber-400 transition-colors">
                  Artisanal • Wood-Fired
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-stone-900/60 border border-stone-800/80 rounded-full px-2 py-1 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeRoute === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      isActive ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-stone-800 rounded-full border border-stone-700 shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Favorites pill (if any) */}
              {favorites.length > 0 && (
                <button
                  id="nav-favs-btn"
                  onClick={() => handleNavClick('menu')}
                  className="hidden lg:flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-red-400 px-3 py-1.5 rounded-full bg-stone-900/50 border border-stone-800 transition-colors"
                  title="View Menu Favorites"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{favorites.length}</span>
                </button>
              )}

              {/* Cart Button */}
              <motion.button
                id="navbar-cart-btn"
                aria-label="Open Cart"
                onClick={openCart}
                animate={badgeBump ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="relative p-2.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white transition-all shadow-md flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 text-stone-200 stroke-[2]" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-stone-950 font-black text-[11px] flex items-center justify-center shadow-lg shadow-orange-950/60"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Order Now CTA */}
              <motion.button
                id="navbar-order-now-btn"
                onClick={() => handleNavClick('menu')}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:flex items-center gap-2 py-2 px-4.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-orange-950/40 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 fill-stone-950 stroke-none" />
                <span>Order Now</span>
              </motion.button>

              {/* Mobile Hamburger Toggle */}
              <button
                id="mobile-menu-toggle"
                aria-label="Toggle mobile menu"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="md:hidden p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Animated Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-30 md:hidden bg-[#12100e]/98 backdrop-blur-2xl border-b border-stone-800 shadow-2xl p-6"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left text-sm font-bold tracking-wide transition-all ${
                      isActive
                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                        : 'text-stone-300 hover:bg-stone-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}

              <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleNavClick('menu');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider text-center shadow-lg"
                >
                  Order Pizza Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
