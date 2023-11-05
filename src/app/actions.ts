'use server'

import { stripe } from "@/lib/stripe";
import { ProductsType } from "@/types/products";

export async function fetchProducts({lastProductId}: {lastProductId?: string | undefined}) {
  const params = lastProductId ? { starting_after: lastProductId, limit: 12 } : { limit: 12};
  
  const { data: products, has_more } = await stripe.products.list(params);

  const formatedProducts = await Promise.all(
    products.map(async (products) => {
      const prices = await stripe.prices.list({
        product: products.id
      })

      return {
        id: products.id,
        price: prices.data[0].unit_amount,
        name: products.name, 
        image: products.images[0],
        description:  products.description,
        currency: prices.data[0].currency
      }
    })
  )

  return { formatedProducts, has_more }
}