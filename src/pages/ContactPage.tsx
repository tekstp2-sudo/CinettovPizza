import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Instagram,
  ShoppingBag,
  CheckCircle2,
  Bike,
  Flame,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageRoute, DeliveryFormData } from '../types';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState<DeliveryFormData>({
    name: '',
    phone: '',
    address: '',
    apartment: '',
    floor: '',
    notes: '',
    paymentMethod: 'card',
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CINETTOV' || promoCode.trim().toUpperCase() === 'PIZZA10') {
      setDiscountPercent(15);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "CINETTOV" for 15% off!');
    }
  };

  const discountAmount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const finalTotal = Math.max(0, Math.round((total - discountAmount) * 100) / 100);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 bg-[#0c0a09] min-h-screen text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-orange-400 mb-2"
          >
            SPEEDY DELIVERY & CONTACT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#fbf8f3] font-display mb-4 tracking-tight"
          >
            Let's get your pizza to you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto"
          >
            Tell us where you are and we'll take care of the rest. Hot, fresh, and straight from the oven.
          </motion.p>
        </div>

        {/* Main 2-Column Grid: Form on Left, Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT: Order / Delivery Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141210] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[#fbf8f3] font-display mb-6 flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-orange-500" />
              Delivery Details
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="order-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marco Rossi"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="order-phone-input"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                  Street Address & House Number *
                </label>
                <input
                  id="order-address-input"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Nevsky Prospekt 48"
                  className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Apartment / Suite
                  </label>
                  <input
                    id="order-apartment-input"
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    placeholder="Apt 14"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Floor / Intercom
                  </label>
                  <input
                    id="order-floor-input"
                    type="text"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    placeholder="Floor 3, Code #142"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                  Delivery Notes
                </label>
                <textarea
                  id="order-notes-input"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Leave at door, call when arrived, extra napkins please"
                  className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card' as const, label: 'Credit Card', icon: CreditCard },
                    { id: 'cash' as const, label: 'Cash to Courier', icon: Banknote },
                    { id: 'apple_pay' as const, label: 'Digital Pay', icon: Smartphone },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = formData.paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500/10 text-white'
                            : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-stone-400'}`} />
                        <span className="text-xs font-bold truncate">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-orange-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Confirming Order...</span>
                  ) : (
                    <>
                      <span>Place Order • ${finalTotal.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141210] border border-stone-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-bold text-[#fbf8f3] font-display">
                    Order Summary
                  </h3>
                </div>
                <span className="text-xs font-semibold text-stone-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-xs text-stone-400">
                      No pizzas added yet. Visit the menu to choose your favorite!
                    </p>
                    <button
                      onClick={() => onNavigate('menu')}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex items-center justify-between gap-3 text-xs py-2 border-b border-stone-800/40"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.pizza.image}
                          alt={item.pizza.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="font-bold text-[#fbf8f3] truncate font-display">
                            {item.pizza.name}
                          </p>
                          <p className="text-[11px] text-stone-400 truncate">
                            {item.sizeName} • {item.crustName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center bg-stone-900 rounded-md border border-stone-800 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="w-5 h-5 rounded hover:bg-stone-800 flex items-center justify-center text-stone-300"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="w-5 h-5 rounded hover:bg-stone-800 flex items-center justify-center text-stone-300"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-bold text-stone-200 w-14 text-right font-display">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              {items.length > 0 && (
                <form onSubmit={handleApplyPromo} className="pt-3 pb-4 border-t border-stone-800 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. CINETTOV)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-400 mb-2">{promoError}</p>}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-400 mb-2 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Promo code applied: {discountPercent}% OFF
                </p>
              )}

              {/* Cost Calculation */}
              <div className="pt-3 border-t border-stone-800 space-y-2 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span className="text-stone-200 font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#fbf8f3] pt-3 border-t border-stone-800">
                  <span className="font-display">Total</span>
                  <span className="text-xl text-orange-400 font-display">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-[#141210] border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">
                Contact us
              </h4>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-orange-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Phone Orders & Inquiries
                    </span>
                    <span className="font-mono font-bold text-stone-100">+7 XXX XXX XX XX</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-orange-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Working hours
                    </span>
                    <span className="font-bold text-stone-100">Every day · 11:00 — 23:00</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-orange-400">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Instagram
                    </span>
                    <a
                      href="https://instagram.com/cinettovpizza"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-stone-100 hover:text-orange-400 transition-colors"
                    >
                      @cinettovpizza
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-orange-400">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Telegram
                    </span>
                    <a
                      href="https://t.me/cinettov"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-orange-400 hover:underline"
                    >
                      @cinettovpizza
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Delivery / Map-Inspired Section */}
        <section className="rounded-3xl bg-[#141210] border border-stone-800 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  LIVE RADIUS RADAR
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#fbf8f3] font-display">
                  Wood-Fired Delivery Coverage
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md">
                  Guaranteed thermal speed. Heated insulated dispatch ensures optimal crunch within our delivery zones.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Couriers Active Now
                </span>
              </div>
            </div>

            {/* Stylized Visual Map / Radar Graphic */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-stone-950/80 border border-stone-800/80 overflow-hidden flex items-center justify-center p-6">
              {/* Radar Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-orange-500/20" />
              <div className="absolute w-72 h-72 rounded-full border border-amber-500/15" />
              <div className="absolute w-96 h-96 rounded-full border border-stone-800" />

              {/* Scanning Ray Line */}
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent transform rotate-45 pointer-events-none" />

              {/* Central Kitchen Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-stone-950 shadow-xl shadow-orange-950/80 animate-bounce">
                    <Flame className="w-6 h-6 fill-stone-950 stroke-stone-950" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-stone-950" />
                </div>
                <span className="text-xs font-extrabold text-[#fbf8f3] mt-2 bg-stone-900/90 px-3 py-1 rounded-full border border-stone-800 font-display shadow-md">
                  Cinettov Central Oven
                </span>
                <span className="text-[10px] text-orange-400 font-semibold">
                  Avg bake: 90 seconds
                </span>
              </div>

              {/* Zone Pins / Hotspots */}
              <div className="absolute top-10 left-12 sm:left-24 bg-stone-900/90 border border-stone-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow-lg">
                <Bike className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="font-bold text-stone-200">Zone A • Central</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">15-25 min</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 sm:right-24 bg-stone-900/90 border border-stone-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow-lg">
                <Bike className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-bold text-stone-200">Zone B • Extended</p>
                  <p className="text-[10px] text-orange-400 font-semibold">25-35 min</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Order Confirmed Animated Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#141210] border border-stone-800 p-6 sm:p-8 text-center shadow-2xl z-10"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-1">
                ORDER #CN-9204 RECEIVED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#fbf8f3] font-display mb-2">
                Your pizza is being fired!
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                Thank you, {formData.name || 'valued guest'}! Our pizzaiolo has received your order. We'll deliver to {formData.address || 'your address'} in approx 28 minutes.
              </p>

              {/* Status Stepper */}
              <div className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800 text-left mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Order Confirmed</span>
                    <span className="text-[10px] text-stone-400">Payment method: {formData.paymentMethod}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-stone-950 flex items-center justify-center text-xs font-bold animate-pulse">
                    🔥
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-400 block">Stretching & Wood-Baking</span>
                    <span className="text-[10px] text-stone-400">In the 480°C oak-fired oven</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-300 block">Out for Thermal Delivery</span>
                    <span className="text-[10px] text-stone-500">Estimated courier departure in 10 mins</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onNavigate('home');
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onNavigate('menu');
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all"
                >
                  Order Another
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
