import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Plus, Minus, ShoppingBag, Sparkles, Flame, Leaf, Clock, FlameKindling } from 'lucide-react';
import { Pizza, PizzaSize, CrustType, ExtraItem } from '../types';
import { SIZES_CONFIG, CRUSTS_CONFIG, AVAILABLE_EXTRAS } from '../data/pizzas';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  pizza: Pizza | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ pizza, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('standard');
  const [selectedCrust, setSelectedCrust] = useState<CrustType>('neapolitan');
  const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Reset state whenever modal opens with new pizza
  useEffect(() => {
    if (pizza) {
      setSelectedSize('standard');
      setSelectedCrust('neapolitan');
      setSelectedExtras([]);
      setQuantity(1);
      setIsAddedSuccess(false);
    }
  }, [pizza]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pizza) return null;

  const toggleExtra = (extra: ExtraItem) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const sizeConfig = SIZES_CONFIG[selectedSize];
  const crustConfig = CRUSTS_CONFIG[selectedCrust];
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);

  const unitPrice =
    Math.round(
      (pizza.price * sizeConfig.priceMultiplier + crustConfig.extraPrice + extrasTotal) * 100
    ) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const handleAddToCart = () => {
    addToCart(pizza, selectedSize, selectedCrust, selectedExtras, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#141210] border border-stone-800 shadow-2xl shadow-black/80 z-10 text-stone-200"
        >
          {/* Close button */}
          <button
            id="close-product-modal"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Image & Highlights */}
            <div className="relative bg-gradient-to-b from-stone-900 to-[#141210] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800/80">
              <div className="flex flex-wrap gap-2 mb-4">
                {pizza.isBestseller && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/90 text-stone-950">
                    <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                    Bestseller
                  </span>
                )}
                {pizza.isSpicy && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-red-600/90 text-white">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    Spicy Italian
                  </span>
                )}
                {pizza.isVegetarian && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-600/90 text-white">
                    <Leaf className="w-3.5 h-3.5 fill-white" />
                    Vegetarian
                  </span>
                )}
              </div>

              {/* Pizza Photo with Floating Glow */}
              <div className="relative my-auto py-4 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-2xl shadow-orange-950/40 border-2 border-stone-800/80">
                  <motion.img
                    src={pizza.image}
                    alt={pizza.name}
                    initial={{ rotate: -5, scale: 0.95 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Info chips */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-stone-800/80">
                <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>{pizza.prepTimeMinutes} min fresh bake</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <FlameKindling className="w-4 h-4 text-amber-400" />
                  <span>{pizza.calories} kcal / serving</span>
                </div>
              </div>
            </div>

            {/* Right Column: Customization & Order */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="mb-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fbf8f3] tracking-tight font-display">
                    {pizza.name}
                  </h2>
                  <p className="text-sm font-medium italic text-orange-400 mt-0.5">
                    {pizza.italianName}
                  </p>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {pizza.description}
                </p>

                {/* Ingredients section */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    Ingredients
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {pizza.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs text-stone-300 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    1. Select Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(SIZES_CONFIG) as PizzaSize[]).map((sizeKey) => {
                      const cfg = SIZES_CONFIG[sizeKey];
                      const isSelected = selectedSize === sizeKey;
                      const sizePrice = Math.round(pizza.price * cfg.priceMultiplier * 100) / 100;

                      return (
                        <button
                          key={sizeKey}
                          type="button"
                          onClick={() => setSelectedSize(sizeKey)}
                          className={`p-2.5 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/10 text-white shadow-md'
                              : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#fbf8f3]">
                              {cfg.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            {cfg.diameter}
                          </p>
                          <p className="text-xs font-semibold text-orange-400 mt-1">
                            ${sizePrice.toFixed(2)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Crust Selector */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    2. Select Crust
                  </label>
                  <div className="space-y-1.5">
                    {(Object.keys(CRUSTS_CONFIG) as CrustType[]).map((crustKey) => {
                      const cfg = CRUSTS_CONFIG[crustKey];
                      const isSelected = selectedCrust === crustKey;

                      return (
                        <button
                          key={crustKey}
                          type="button"
                          onClick={() => setSelectedCrust(crustKey)}
                          className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/10 text-white'
                              : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-[#fbf8f3] block">
                              {cfg.name}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {cfg.description}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-orange-400 ml-2 whitespace-nowrap">
                            {cfg.extraPrice > 0 ? `+$${cfg.extraPrice.toFixed(2)}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Extras */}
                <div className="mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    3. Gourmet Extras (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_EXTRAS.map((extra) => {
                      const isSelected = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`p-2 rounded-xl text-left border flex items-center justify-between text-xs transition-all ${
                            isSelected
                              ? 'border-amber-500/80 bg-amber-500/10 text-white'
                              : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <span className="truncate pr-1">{extra.name}</span>
                          <span className="font-semibold text-orange-400 whitespace-nowrap">
                            +${extra.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-stone-900 rounded-2xl border border-stone-800 p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#fbf8f3]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  id="modal-add-to-cart-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-stone-950 font-bold flex items-center justify-between shadow-lg shadow-orange-950/40 hover:brightness-110 transition-all"
                >
                  <span className="flex items-center gap-2">
                    {isAddedSuccess ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </span>
                  <span className="text-base font-extrabold tracking-tight font-display">
                    ${totalPrice.toFixed(2)}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
