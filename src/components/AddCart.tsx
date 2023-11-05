'use client';

import { useCartStore } from "@/stores/store";
import { ProductsType } from "@/types/products";

export default function AddCartComponent({ product }: { product: ProductsType }) {
  const { addProduct } = useCartStore();

  return (
    <button className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center" onClick={() => addProduct(product)}>Adicionar ao Carrinho</button>
  )
}