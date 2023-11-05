'use client'

import { ProductsType } from "@/types/products"
import { useCallback, useEffect, useState } from "react"
import Product from "./Products"

import { useInView } from 'react-intersection-observer'
import { fetchProducts } from "@/app/actions"

export default function Infinity({
  initialProducts
}: {
  initialProducts: ProductsType[]
}) {
  const [products, setProducts] = useState<ProductsType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [ ref, inView ] = useInView({
    threshold: 0,
    triggerOnce: false
  })

  const lastProductId = products[products.length - 1]?.id

  const loadingMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const { formatedProducts, has_more } = await fetchProducts({ lastProductId })

    if(formatedProducts) {
      setProducts((prevState) => [...prevState, ...formatedProducts])
      setHasMore(has_more)
    }

    setIsLoading(false)
  }, [ lastProductId ])

  useEffect(() => {
    if(inView && hasMore && !isLoading) {
      loadingMoreProducts()
    }
  }, [hasMore, inView, isLoading, loadingMoreProducts])

  if(!products) {
    return <div>carregando...</div>
  }

  return (
    <>
      {products.map((product:ProductsType) => (
        <Product key={product.id} product={product} />
      ))}


      {hasMore && (
        <div ref={ref}>carregando...</div>
      )}
    </>
  )
}