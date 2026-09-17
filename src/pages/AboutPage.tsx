import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Flame, Sparkles, Heart, Award, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

interface StatItemProps {
  value: number;
  suffix?: string;
  isInfinity?: boolean;
  label: string;
}

const StatCounter: React.FC<StatItemProps> = ({ value, suffix = '', isInfinity = false, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || isInfinity) return;

    let start = 0;
    const duration = 1600; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, isInfinity]);

  return (
    <div ref={ref} className="text-center p-6 rounded-3xl bg-[#141210] border border-stone-800/80 shadow-lg">
      <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-display mb-2">
        {isInfinity ? '∞' : `${count}${suffix}`}
      </div>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-300">
        {label}
      </p>
    </div>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    {
      number: '01',
      title: 'The Dough',
      tagline: '48-Hour Cold Fermentation',
      description:
        'Fresh handmade dough prepared with care. We use fine Italian Tipo 00 flour, filtered spring water, extra virgin olive oil, and sea salt. Resting the dough for 48 hours breaks down complex starches, creating an airy, naturally digestible crust with exquisite flavor.',
      image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '02',
      title: 'The Ingredients',
      tagline: 'Flavors Selected Without Shortcuts',
      description:
        'Quality ingredients selected for flavor, not shortcuts. Real San Marzano D.O.P. tomatoes crushed fresh, milky Fior di Latte mozzarella shipped fresh weekly, fragrant sweet Genovese basil, and spicy Calabrian nduja cured the traditional way.',
      image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '03',
      title: 'The Oven',
      tagline: '480°C Radiant Wood Fire',
      description:
        'High heat, crisp edges and a perfectly melted center. Our domed wood-fired oven burns seasoned oak wood at blistering 480°C (900°F). The pizza bakes in just 90 seconds, flash-sealing juices and puffing the crust with characteristic leopard blisters.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '04',
      title: 'Your Door',
      tagline: 'Steam-Vented Thermal Delivery',
      description:
        'Packed hot and delivered straight to you. We engineered custom breathable pizza boxes with micro-vents to let steam escape while trapping intense heat. Your crust stays crisp and never turns soggy on the ride to your doorstep.',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#0c0a09] min-h-screen text-stone-200 overflow-hidden">
      {/* 1. EDITORIAL HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=2000&q=80"
            alt="Pizzaiolo stretching fresh artisanal dough"
            className="w-full h-full object-cover brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-[#0c0a09]/80" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-orange-400 mb-4"
          >
            OUR PHILOSOPHY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#fbf8f3] tracking-tight font-display mb-6 leading-[1.1]"
          >
            More than pizza. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              It’s a ritual.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* 2. STORYTELLING SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            THE CINETTOV MANIFESTO
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#fbf8f3] tracking-tight font-display leading-snug">
            We believe great pizza starts with simple things done right.
          </h2>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
            Slow-made dough. Fresh ingredients. A hot oven. And a little obsession with getting every detail right.
          </p>

          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Founded out of a deep reverence for traditional Italian baking and modern food craft, CinettovPizza was created to prove that home delivery doesn't have to mean compromising on artisanal quality. We treat every pizza as if it were served at a fine dining table in Naples.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE TIMELINE */}
      <section className="py-20 bg-[#0e0c0a] border-y border-stone-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-2">
              THE 4-STEP CRAFT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#fbf8f3] tracking-tight font-display">
              From Grain to Doorstep
            </h2>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Steps navigation */}
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.div
                    key={step.number}
                    id={`timeline-step-${step.number}`}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ x: 4 }}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#181512] border-orange-500/60 shadow-xl shadow-orange-950/20'
                        : 'bg-[#12100e] border-stone-800/80 hover:border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 font-mono">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-[#fbf8f3] font-display">
                        {step.title}
                      </h3>
                      <span className="text-xs text-stone-400 font-medium ml-auto hidden sm:inline">
                        {step.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed pl-9">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Step Visual Preview */}
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 lg:aspect-square bg-stone-900 border border-stone-800 shadow-2xl">
              <motion.img
                key={activeStep}
                src={timelineSteps[activeStep].image}
                alt={timelineSteps[activeStep].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                  Step {timelineSteps[activeStep].number}
                </span>
                <h4 className="text-2xl font-black text-white font-display">
                  {timelineSteps[activeStep].title}
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  {timelineSteps[activeStep].tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS WITH ANIMATED COUNTERS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            BY THE NUMBERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fbf8f3] font-display">
            Built on Passion & Precision
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCounter value={10} suffix="+" label="Pizza recipes" />
          <StatCounter value={100} suffix="%" label="Fresh ingredients" />
          <StatCounter value={30} suffix=" min" label="Average delivery" />
          <StatCounter value={0} isInfinity label="Good mood" />
        </div>
      </section>

      {/* 5. PASSION CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 to-[#191512] border border-stone-800 p-8 sm:p-14 text-center">
          <div className="max-w-xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 fill-orange-400" />
              ARTISAN DEDICATION
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#fbf8f3] font-display leading-tight">
              Made with passion. <br />
              Served with love.
            </h2>

            <p className="text-sm text-stone-400">
              Ready to experience what proper handmade Neapolitan pizza tastes like?
            </p>

            <div className="pt-2">
              <motion.button
                id="about-explore-menu-btn"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onNavigate('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-orange-950/40 inline-flex items-center gap-2"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
