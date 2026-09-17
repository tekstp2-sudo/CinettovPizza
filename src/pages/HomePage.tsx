import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Clock, ShieldCheck, Wheat, Bike, Star, ChefHat } from 'lucide-react';
import { PIZZAS } from '../data/pizzas';
import { PizzaCard } from '../components/PizzaCard';
import { Pizza, PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenDetails: (pizza: Pizza) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenDetails }) => {
  const featuredPizzas = PIZZAS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Cinematic Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=85"
            alt="Artisanal wood-fired pizza with bubbling cheese"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.15]"
            priority="true"
          />
          {/* Gradients to blend into dark canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/60 to-[#0c0a09]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0c0a09]/50 to-[#0c0a09]" />
        </div>

        {/* Ambient Warm Embers / Light Orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            {/* Delivery indicator / Fresh from oven pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg shadow-orange-950/30"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>🔥 Fresh from the oven</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-300 font-semibold lowercase">30 min delivery</span>
            </motion.div>

            {/* Small Label */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-stone-400 mb-3"
            >
              AUTHENTIC • FRESH • HOT
            </motion.p>

            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#fbf8f3] tracking-tight leading-[1.05] font-display mb-6"
            >
              Pizza made to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                make you hungry.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              Fresh ingredients, handmade dough and bold flavors — delivered straight to your door.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                id="hero-order-pizza-btn"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-2xl shadow-orange-950/60 transition-all"
              >
                <span>Order Pizza</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>

              <motion.button
                id="hero-explore-menu-btn"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 hover:border-orange-500/40 text-[#fbf8f3] font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all"
              >
                Explore Menu
              </motion.button>
            </motion.div>

            {/* Micro Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <span className="text-stone-200 font-bold">4.9/5</span>
                <span>(1,200+ reviews)</span>
              </div>
              <span className="hidden sm:inline text-stone-700">•</span>
              <div className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-orange-400" />
                <span>48h Cold Fermented Dough</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED PIZZAS SECTION */}
      <section className="py-20 bg-[#0c0a09] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400 block mb-2">
                HANDCRAFTED PERFECTION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fbf8f3] tracking-tight font-display">
                Your next favorite pizza
              </h2>
            </div>

            <button
              id="view-full-menu-btn"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-sm font-bold text-stone-300 hover:text-orange-400 transition-colors group"
            >
              <span>View all 10 pizzas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Featured Pizza Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} onOpenDetails={onOpenDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CINETTOVPIZZA? SECTION */}
      <section className="py-24 bg-[#0e0c0a] border-y border-stone-800/60 relative overflow-hidden">
        {/* Decorative ambient background accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block mb-2">
              OUR STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fbf8f3] tracking-tight font-display mb-4">
              Why CinettovPizza?
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
              We reject frozen ingredients, industrial conveyor belts, and flavor shortcuts. Every pizza is crafted with true Neapolitan respect.
            </p>
          </div>

          {/* 4 Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-7 rounded-3xl bg-[#141210] border border-stone-800/80 hover:border-orange-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#fbf8f3] mb-2 font-display">
                  Fresh every day
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  No pre-baked crusts or reheated dough. Made fresh each morning and proofed for optimal texture.
                </p>
              </div>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-7 rounded-3xl bg-[#141210] border border-stone-800/80 hover:border-orange-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Wheat className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#fbf8f3] mb-2 font-display">
                  Handmade dough
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  Tipo 00 Italian flour with 48 hours of slow cold fermentation gives an airy, digestible leopard-spotted cornicione.
                </p>
              </div>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-7 rounded-3xl bg-[#141210] border border-stone-800/80 hover:border-orange-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#fbf8f3] mb-2 font-display">
                  Premium ingredients
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  San Marzano D.O.P. tomatoes from volcanic soil, fresh Fior di Latte mozzarella, and cold-pressed extra virgin olive oil.
                </p>
              </div>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="p-7 rounded-3xl bg-[#141210] border border-stone-800/80 hover:border-orange-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bike className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#fbf8f3] mb-2 font-display">
                  Fast delivery
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  Delivered in thermal ventilated pizza boxes within 30 minutes to preserve crisp crust and molten cheese.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LARGE CTA SECTION */}
      <section className="py-24 bg-[#0c0a09] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-stone-950 via-[#171412] to-stone-900 border border-stone-800 p-8 sm:p-14 md:p-16 text-center shadow-2xl">
            {/* Ambient fire glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
                OVEN IS HOT & READY
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#fbf8f3] tracking-tight leading-tight font-display">
                Hungry yet? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                  Your pizza is waiting.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto">
                Select your crust, add favorite toppings, and our master pizzaiolo will fire up the oven right away.
              </p>

              <div className="pt-2 flex justify-center">
                <motion.button
                  id="cta-order-now-btn"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('menu')}
                  className="px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-black text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-2xl shadow-orange-950/60 transition-all"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
