'use client'

import { useCartStore } from "@/stores/store"
import { useEffect } from "react"

export default function CheckoutComponent() {

  const { cart, paymentIntent } = useCartStore()

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        items: cart,
        payment_intent_id: paymentIntent
      })
    }).then(res => { return res.json()}).then(data => {
      console.log(data.paymentIntent)
    })
  }, [cart, paymentIntent])

  return (
    <div>
      <h1>checkout</h1>
    </div>
  )
}