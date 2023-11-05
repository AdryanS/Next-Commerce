"use client";

import { useCartStore } from "@/stores/store";
import { ShoppingCart } from "lucide-react";
import CartDrawerComponent from "./CartDrawer";

export default function CartComponent() {
  const useStore = useCartStore();

  return (
    <>
      <div className="flex items-center relative" onClick={() => useStore.toggleCart()}>
        <ShoppingCart />
        <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
          {useStore.cart.length}
        </span>
      </div>

      {
        useStore.isOpen && (
          <CartDrawerComponent />
        )
      }
      
    </>
  );
}
