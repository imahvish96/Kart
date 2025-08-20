import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  itemCount?: number;
}
interface BearState {
  bears: number;
  cartItems: CartItem[];
  subTotal: number;
  shippingCost?: number;
  total: number;
  discount?: number;
  coupon?: string;
  increase: (by: number) => void;
  setCartItem: (item: CartItem) => void;
  removeCartItem: (id: number) => void;
  increaseItemCount: (id: number) => void;
  decreaseItemCount: (id: number) => void;
  addSubTotal: () => void;
  addTotal: () => void;
  applyCoupon: (coupon: string) => void;
  removeCoupon: () => void;
}

export const useStore = create<BearState>()((set) => ({
  bears: 0,
  cartItems: [],
  subTotal: 0,
  total: 0,
  shippingCost: 5.0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  setCartItem: (item: CartItem) =>
    set((state) => ({
      cartItems: state.cartItems.some((cartItem) => cartItem.id === item.id)
        ? state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, itemCount: (cartItem.itemCount || 0) + 1 }
              : cartItem
          )
        : [...state.cartItems, { ...item, itemCount: 1 }],
    })),
  removeCartItem: (id: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => {
        return item.id !== id;
      }),
    }));
  },

  increaseItemCount: (id: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, itemCount: (item.itemCount || 0) + 1 }
          : item
      ),
    }));
  },
  decreaseItemCount: (id: number) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          return item.id === id && (item.itemCount || 0) > 0
            ? { ...item, itemCount: (item.itemCount || 0) - 1 }
            : item;
        })
        .filter((item) => item.itemCount !== 0),
    }));
  },

  addSubTotal: () =>
    set((state) => ({
      subTotal:
        Math.round(
          state.cartItems.reduce(
            (total, item) => total + item.price * (item.itemCount || 1),
            0
          ) * 100
        ) / 100,
    })),

  addTotal: () => {
    set((state) => ({
      total: state.subTotal + state.shippingCost!,
    }));
  },

  applyCoupon: (coupon: string) => {
    set((state) => {
      let discount = 0;
      if (coupon === "SAVE10") {
        discount = 10;
      } else if (coupon === "SAVE20") {
        discount = 20;
      }
      return {
        coupon,
        discount,
        total: Math.max(0, state.subTotal + state.shippingCost! - discount),
      };
    });
  },
  removeCoupon: () =>
    set((state) => ({
      coupon: undefined,
      discount: 0,
      total: state.subTotal + state.shippingCost!,
    })),
}));
