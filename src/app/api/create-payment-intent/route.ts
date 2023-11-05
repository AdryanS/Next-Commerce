import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { ProductsType } from '@/types/products';
import { auth } from '@clerk/nextjs'

const calculateOrderAmount = (items: ProductsType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return totalPrice
}

export async function POST (req: Request) {
  const { userId } = auth()
  const { items, payment_intent_id } = await req.json();

  if(!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const temp = "cus_OwpFm6ytI9Vdk1"


  const total = calculateOrderAmount(items)

  const orderData = {
    user: { connect: { id: 1 }},
    amount: total,
    currency: 'brl',
    paymentIntentId: payment_intent_id,
    status:  'pending',
    products: {
      create: items.map((item: ProductsType) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))
    }
  }

  if(payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if(current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: total
      })

      const [ existing_order, update_order ] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
          include: { products: true }
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductsType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image
              }))
            }
          }
        })

      ])

      if(!existing_order) {
        return new Response('Order not found', { status: 404 })
      }

      return Response.json({  paymentIntent: updated_intent }, { status: 200})

    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'brl',
      automatic_payment_methods: { enabled: true }
    })

    orderData.paymentIntentId = paymentIntent.id


    const newOrder = await prisma.order.create({
      data: orderData
    })

    return Response.json({  paymentIntent }, { status: 200 })
  }
}