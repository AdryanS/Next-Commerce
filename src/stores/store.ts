import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductsType } from "@/types/products";

type CartState = {
  cart: ProductsType[];
  addProduct: (product: ProductsType) => void;
  removeProduct: (product: ProductsType) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      addProduct: (item) =>
        set((state) => {
          const product = state.cart.find((p) => p.id === item.id);

          if (product) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 };
              }
              return p;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === item.id);

          if(existingProduct && existingProduct.quantity! > 1) {
            const updatedCart = state.cart.map((p) => {
              if(p.id === item.id) {
                return { ...p, quantity: p.quantity! - 1 }
              }

              return p
            });
            return { cart: updatedCart }
          } else {
            const filtredCart = state.cart.filter((p) => p.id !== item.id);

            return { cart: filtredCart }
          }
        }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: 'cart',
      setCheckout: (checkout) => set((state) => ({
        onCheckout: checkout
      })),
      paymentIntent: '',
      setPaymentIntent: (paymentIntent) => set((state) => ({ paymentIntent }))
    }),
    {
      name: "cart-storage",
    }
  )
);
