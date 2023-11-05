import AddCartComponent from "@/components/AddCart";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/lib/utils";
import { ProductsType } from "@/types/products";
import Stripe from "stripe";

async function getProducts(id:string) {
  const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    apiVersion: '2023-10-16'
  });

  const product = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: product.id
  })

  return {
    id: product.id,
    price: price.data[0].unit_amount,
    name: product.name,
    image: product.images[0],
    description: product.description,
    currency: price.data[0].currency
  } as ProductsType
}

export default async function ProductPage({params: { id }}: { params: { id: string }}) {

  const product = await getProducts(id)

  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <h2 className="text-xl text-teal-600 font-bold">{formatPrice(product.price)}</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddCartComponent product={product} />
      </div>
      
    </div>
  )
}