export type PizzaCategory = 'all' | 'classic' | 'meat' | 'spicy' | 'cheese' | 'vegetarian';

export type PizzaSize = 'standard' | 'large' | 'family';
export type CrustType = 'neapolitan' | 'thin' | 'cheese-crust';

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

export interface Pizza {
  id: string;
  name: string;
  italianName: string;
  description: string;
  ingredients: string[];
  price: number;
  category: 'classic' | 'meat' | 'spicy' | 'cheese' | 'vegetarian';
  image: string;
  rating: number;
  reviewsCount: number;
  calories: number;
  prepTimeMinutes: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  cartItemId: string;
  pizza: Pizza;
  size: PizzaSize;
  sizeName: string;
  sizeDiameter: string;
  crust: CrustType;
  crustName: string;
  extras: ExtraItem[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryFormData {
  name: string;
  phone: string;
  address: string;
  apartment: string;
  floor: string;
  notes: string;
  paymentMethod: 'card' | 'cash' | 'apple_pay';
}

export type PageRoute = 'home' | 'menu' | 'about' | 'contact';
