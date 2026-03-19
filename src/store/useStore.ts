import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  paymentMethod: string;
  deliveryAddress: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  searchHistory: string[];
  isCartOpen: boolean;
  lastOrder: Order | null;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  addSearchHistory: (query: string) => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;
  placeOrder: (paymentMethod?: string, deliveryAddress?: string) => Order;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      searchHistory: [],
      isCartOpen: false,
      lastOrder: null,

      addToCart: (product, quantity = 1, color, size) => {
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity, selectedColor: color, selectedSize: size }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }));
      },

      addRecentlyViewed: (productId) => {
        set((state) => ({
          recentlyViewed: [productId, ...state.recentlyViewed.filter((id) => id !== productId)].slice(0, 20),
        }));
      },

      addSearchHistory: (query) => {
        set((state) => ({
          searchHistory: [query, ...state.searchHistory.filter((q) => q !== query)].slice(0, 10),
        }));
      },

      setCartOpen: (open) => set({ isCartOpen: open }),

      cartTotal: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

      placeOrder: (paymentMethod = 'Credit/Debit Card', deliveryAddress = '') => {
        const { cart, cartTotal, clearCart } = get();
        const order: Order = {
          id: 'LXM-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
          items: cart.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
          })),
          total: cartTotal(),
          date: new Date().toISOString(),
          paymentMethod,
          deliveryAddress,
        };
        set({ lastOrder: order });
        clearCart();
        return order;
      },
    }),
    { name: 'luxe-store' }
  )
);
