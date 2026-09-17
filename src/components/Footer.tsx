import React from 'react';
import { Flame, Instagram, Send, Music2, Clock, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#080706] border-t border-stone-800/80 text-stone-300 pt-16 pb-12 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-950/50">
                <Flame className="w-5 h-5 text-stone-950 fill-stone-950 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#fbf8f3] font-display">
                Cinettov<span className="text-orange-500">Pizza</span>
              </span>
            </div>

            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Hot pizza. Good ingredients. Zero compromises.
            </p>

            <p className="text-xs text-stone-400/90 leading-relaxed max-w-md">
              Hand-stretched 48-hour fermented Neapolitan dough baked in our 480°C wood-fired oven. Delivered piping hot to preserve the crunch and airy crust.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/cinettovpizza"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-orange-500/20 hover:text-orange-400 border border-stone-800 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/cinettov"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-orange-500/20 hover:text-orange-400 border border-stone-800 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@cinettovpizza"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-orange-500/20 hover:text-orange-400 border border-stone-800 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Music2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Delivery Hours
            </h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-200 block font-semibold">Every day</span>
                  <span>11:00 — 23:00</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-200 block font-semibold">Hotline</span>
                  <span>+7 (999) 000-00-00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 5: Decorative Visual Card */}
          <div className="rounded-2xl bg-stone-900/60 border border-stone-800 p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Italian Pizzeria
              </span>
              <p className="text-xs text-stone-300 font-medium">
                Fresh wood-fired crust. 100% natural Italian ingredients.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                Central Kitchen
              </span>
              <span className="text-emerald-400 font-semibold">Open Now</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with mandatory exact Russian sentence */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} CinettovPizza. All rights reserved.</p>

          {/* EXACT MANDATED TEXT */}
          <div className="text-stone-300 font-medium tracking-wide">
            Хочешь такой же сайт пиши{' '}
            <a
              href="https://t.me/cinettov"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 hover:text-amber-300 underline font-bold inline-flex items-center gap-0.5 transition-colors"
            >
              @cinettov
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
