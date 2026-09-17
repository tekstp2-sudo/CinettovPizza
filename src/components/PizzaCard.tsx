import React from 'react';
import { motion } from 'motion/react';
import { Heart, Plus, Sparkles, Flame, Leaf } from 'lucide-react';
import { Pizza } from '../types';
import { useCart } from '../context/CartContext';

interface PizzaCardProps {
  pizza: Pizza;
  onOpenDetails: (pizza: Pizza) => void;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onOpenDetails }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(pizza.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(pizza, 'standard', 'neapolitan', [], 1);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pizza.id);
  };

  return (
    <motion.div
      id={`pizza-card-${pizza.id}`}
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => onOpenDetails(pizza)}
      className="group relative cursor-pointer flex flex-col justify-between rounded-3xl bg-[#141210]/90 border border-stone-800/80 hover:border-orange-500/40 p-5 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-orange-950/20 backdrop-blur-sm overflow-hidden"
    >
      {/* Subtle warm glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-900 mb-4">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {pizza.isBestseller && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/90 text-stone-950 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3 h-3 fill-stone-950" />
                Bestseller
              </span>
            )}
            {pizza.isSpicy && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600/90 text-white shadow-sm backdrop-blur-md">
                <Flame className="w-3 h-3 fill-white" />
                Spicy
              </span>
            )}
            {pizza.isVegetarian && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600/90 text-white shadow-sm backdrop-blur-md">
                <Leaf className="w-3 h-3 fill-white" />
                Veg
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            id={`fav-btn-${pizza.id}`}
            aria-label={`Favorite ${pizza.name}`}
            onClick={handleFavorite}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-stone-950/60 hover:bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                favorite ? 'fill-red-500 text-red-500' : 'text-stone-300'
              }`}
            />
          </button>

          {/* Prep time badge */}
          <div className="absolute bottom-3 left-3 text-[11px] font-medium text-stone-300/90 bg-stone-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
            {pizza.prepTimeMinutes} min • {pizza.calories} kcal
          </div>
        </div>

        {/* Title & Italian Subtitle */}
        <div className="mb-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-[#fbf8f3] tracking-tight group-hover:text-orange-400 transition-colors">
              {pizza.name}
            </h3>
          </div>
          <p className="text-xs italic text-orange-400/80 font-medium">
            {pizza.italianName}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
          {pizza.description}
        </p>

        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pizza.ingredients.slice(0, 3).map((ingredient, i) => (
            <span
              key={i}
              className="text-[11px] text-stone-400 bg-stone-900/90 border border-stone-800 px-2 py-0.5 rounded-md"
            >
              {ingredient}
            </span>
          ))}
          {pizza.ingredients.length > 3 && (
            <span className="text-[11px] text-stone-500 py-0.5 px-1">
              +{pizza.ingredients.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Bar: Price & Action */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-400 block font-medium">from</span>
          <span className="text-xl font-extrabold text-[#fbf8f3] tracking-tight font-display">
            ${pizza.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id={`customize-btn-${pizza.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(pizza);
            }}
            className="text-xs font-semibold text-stone-300 hover:text-white px-3 py-2 rounded-xl bg-stone-800/60 hover:bg-stone-800 transition-colors"
          >
            Customize
          </button>
          <motion.button
            id={`quick-add-${pizza.id}`}
            aria-label={`Add ${pizza.name} to cart`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleQuickAdd}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-bold flex items-center justify-center shadow-lg shadow-orange-950/40 transition-shadow"
          >
            <Plus className="w-5 h-5 text-stone-950 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
