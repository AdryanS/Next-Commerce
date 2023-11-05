"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/store";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import CheckoutButtonComponent from "./CheckoutButton";
import CheckoutComponent from "./Checkout";

export default function CartDrawerComponent() {
  const { cart, toggleCart, addProduct, removeProduct, onCheckout } =
    useCartStore();

  return (
    <div
      onClick={() => toggleCart()}
      className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-12 overflow-y-scroll"
      >
        <button
          onClick={() => toggleCart()}
          className="font-bold text-sm text-teal-600 flex flex-row gap-4 items-center"
        >
          <ArrowLeft /> Voltar para a Loja
        </button>

        <div className="border-t border-gray-400 my-4"></div>
        {onCheckout === "cart" && (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover w-24"
                />
                <div>
                  <h2 className="w-42 truncate">{item.name}</h2>
                  <h2>{item.quantity}</h2>
                  <p className="text-teal-600 text-sm font-bold">
                    {formatPrice(item.price)}
                  </p>
                  <button
                    className="py-1 px-2 border rounded-md mt-2 text-sm mr-2"
                    onClick={() => addProduct(item)}
                  >
                    Adiconar
                  </button>
                  <button
                    className="py-1 px-2 border rounded-md mt-2 text-sm"
                    onClick={() => removeProduct(item)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {cart.length > 0 && onCheckout === "cart" && (
          <CheckoutButtonComponent />
        )}

        {onCheckout === "checkout" && <CheckoutComponent />}
      </div>
    </div>
  );
}
