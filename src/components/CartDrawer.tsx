import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Bike } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageRoute } from '../types';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    isOpen,
    closeCart,
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    freeDeliveryProgress,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    onNavigate('contact');
  };

  const handleBrowseMenu = () => {
    closeCart();
    onNavigate('menu');
  };

  const amountNeededForFree = Math.max(0, Math.round((freeDeliveryThreshold - subtotal) * 100) / 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#12100e] border-l border-stone-800 shadow-2xl z-10 flex flex-col h-full text-stone-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#171412]/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#fbf8f3] tracking-tight font-display">
                    Your Pizza Order
                  </h2>
                  <p className="text-xs text-stone-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>

              <button
                id="close-cart-drawer"
                aria-label="Close cart"
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Incentive Progress Bar */}
            <div className="bg-stone-950/80 px-5 py-3 border-b border-stone-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <Bike className="w-3.5 h-3.5 text-orange-400" />
                  {amountNeededForFree > 0 ? (
                    <span>
                      Add <strong className="text-orange-400 font-bold">${amountNeededForFree.toFixed(2)}</strong> more for free delivery
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free delivery unlocked!
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-stone-400 font-mono">
                  {freeDeliveryProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeDeliveryProgress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-stone-900/80 border border-stone-800 flex items-center justify-center text-stone-600">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#fbf8f3] mb-1 font-display">
                      Your cart is hungry
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xs">
                      Handmade wood-fired pizzas are just a few clicks away. Choose your favorites!
                    </p>
                  </div>
                  <button
                    onClick={handleBrowseMenu}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-950/40"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex gap-3.5 relative group hover:border-stone-700 transition-colors"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-20 h-20 rounded-xl object-cover border border-stone-800 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#fbf8f3] truncate font-display">
                            {item.pizza.name}
                          </h4>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-500 hover:text-red-400 transition-colors p-1 -mr-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-orange-400/90 font-medium">
                          {item.sizeName} ({item.sizeDiameter}) • {item.crustName}
                        </p>
                        {item.extras.length > 0 && (
                          <p className="text-[11px] text-stone-400 truncate mt-0.5">
                            +{item.extras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center bg-stone-950/80 rounded-lg border border-stone-800 p-0.5">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#fbf8f3]">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#fbf8f3] font-display">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {items.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-[#171412] space-y-3">
                <div className="space-y-1.5 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-semibold text-stone-200">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#fbf8f3] pt-2 border-t border-stone-800/80">
                    <span className="font-display">Total</span>
                    <span className="text-base text-orange-400 font-display">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  id="cart-checkout-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-950/40 tracking-wide transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
