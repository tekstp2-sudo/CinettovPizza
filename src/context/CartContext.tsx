import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Pizza, PizzaSize, CrustType, ExtraItem } from '../types';
import { SIZES_CONFIG, CRUSTS_CONFIG } from '../data/pizzas';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    pizza: Pizza,
    size?: PizzaSize,
    crust?: CrustType,
    extras?: ExtraItem[],
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold: number;
  freeDeliveryProgress: number;
  // Favorites
  favorites: string[];
  toggleFavorite: (pizzaId: string) => void;
  isFavorite: (pizzaId: string) => void;
  // Feedback toast
  lastAddedItem: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cinettov_cart_v1';
const FAVORITES_STORAGE_KEY = 'cinettov_favs_v1';
const FREE_DELIVERY_THRESHOLD = 35.0;
const BASE_DELIVERY_FEE = 3.5;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['pepperoni', 'margherita'];
    } catch {
      return ['pepperoni', 'margherita'];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (
    pizza: Pizza,
    size: PizzaSize = 'standard',
    crust: CrustType = 'neapolitan',
    extras: ExtraItem[] = [],
    quantity: number = 1
  ) => {
    const sizeConfig = SIZES_CONFIG[size];
    const crustConfig = CRUSTS_CONFIG[crust];

    const extrasKey = extras
      .map((e) => e.id)
      .sort()
      .join('-');
    const cartItemId = `${pizza.id}-${size}-${crust}-${extrasKey}`;

    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice =
      Math.round(
        (pizza.price * sizeConfig.priceMultiplier + crustConfig.extraPrice + extrasTotal) * 100
      ) / 100;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
          totalPrice: Math.round(unitPrice * newQty * 100) / 100,
        };
        return next;
      } else {
        const newItem: CartItem = {
          cartItemId,
          pizza,
          size,
          sizeName: sizeConfig.name,
          sizeDiameter: sizeConfig.diameter,
          crust,
          crustName: crustConfig.name,
          extras,
          quantity,
          unitPrice,
          totalPrice: Math.round(unitPrice * quantity * 100) / 100,
        };
        return [...prev, newItem];
      }
    });

    // Flash toast
    setLastAddedItem(pizza.name);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 3000);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: Math.round(item.unitPrice * nextQty * 100) / 100,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleFavorite = (pizzaId: string) => {
    setFavorites((prev) =>
      prev.includes(pizzaId) ? prev.filter((id) => id !== pizzaId) : [...prev, pizzaId]
    );
  };

  const isFavorite = (pizzaId: string) => {
    return favorites.includes(pizzaId);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = Math.round(items.reduce((acc, item) => acc + item.totalPrice, 0) * 100) / 100;
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
  const total = Math.round((subtotal + deliveryFee) * 100) / 100;
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        freeDeliveryProgress,
        favorites,
        toggleFavorite,
        isFavorite: (id: string) => favorites.includes(id),
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
