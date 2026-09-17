import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Flame, Sparkles, Leaf, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PIZZAS } from '../data/pizzas';
import { PizzaCard } from '../components/PizzaCard';
import { Pizza, PizzaCategory } from '../types';

interface MenuPageProps {
  onOpenDetails: (pizza: Pizza) => void;
}

const CATEGORIES: { id: PizzaCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classic', label: 'Classic' },
  { id: 'meat', label: 'Meat' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'cheese', label: 'Cheese' },
  { id: 'vegetarian', label: 'Vegetarian' },
];

export const MenuPage: React.FC<MenuPageProps> = ({ onOpenDetails }) => {
  const [activeCategory, setActiveCategory] = useState<PizzaCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);

  const filteredPizzas = useMemo(() => {
    return PIZZAS.filter((pizza) => {
      // Category match
      const categoryMatch =
        activeCategory === 'all' || pizza.category === activeCategory;

      // Query match in name, italian name, description, ingredients
      const queryMatch =
        searchQuery.trim() === '' ||
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.italianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Bestseller filter
      const bestsellerMatch = !onlyBestsellers || pizza.isBestseller;

      return categoryMatch && queryMatch && bestsellerMatch;
    });
  }, [activeCategory, searchQuery, onlyBestsellers]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setOnlyBestsellers(false);
  };

  return (
    <div className="pt-28 pb-24 bg-[#0c0a09] min-h-screen text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-orange-400 mb-2"
          >
            OUR MENU
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#fbf8f3] tracking-tight font-display mb-4"
          >
            Pick your perfect pizza.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-stone-400 leading-relaxed max-w-xl mx-auto"
          >
            Classic favorites, bold combinations and something for every mood. Hand-stretched and baked in under 3 minutes.
          </motion.p>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                    isSelected
                      ? 'text-stone-950 shadow-lg shadow-orange-950/40'
                      : 'text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-menu-category"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & quick toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-pizzas-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients or pizza..."
                className="w-full bg-stone-900/90 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                id="filter-bestsellers-btn"
                onClick={() => setOnlyBestsellers((v) => !v)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  onlyBestsellers
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bestsellers Only</span>
              </button>

              {(searchQuery || activeCategory !== 'all' || onlyBestsellers) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-orange-400 px-2.5 py-2 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-6 px-1">
          <span>
            Showing <strong className="text-stone-200">{filteredPizzas.length}</strong> delicious pizzas
          </span>
          <span className="text-[11px] text-stone-500">
            Click any pizza to customize crust, size & extras
          </span>
        </div>

        {/* Grid of Pizzas */}
        {filteredPizzas.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-900 mx-auto flex items-center justify-center text-stone-500 border border-stone-800">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#fbf8f3] font-display">
              No pizzas found matching your search
            </h3>
            <p className="text-sm text-stone-400 max-w-sm mx-auto">
              Try adjusting your category or search query to find our wood-fired selections.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
            >
              Show All Pizzas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} onOpenDetails={onOpenDetails} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
