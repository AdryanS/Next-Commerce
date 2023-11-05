import prisma from "@/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook, WebhookRequiredHeaders } from "svix"
import Stripe from "stripe";
import { EmailAddress } from "@clerk/nextjs/server";

// Webhook secrete do clerk:
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

// Tipagem dos enventos:
type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: EventDataType;
  obeject: 'event';
  type: EventType;
}

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: EmailAddressType[];
  primary_email_address_id: string;
  atributes: Record<string, string | number>;
}

type EmailAddressType =  {
  id: string;
  email_address: string;
}

// handle função que execulta uma ação do webhook:
async function handler(request:Request, response:Response) {
  // body ou payload:
  const payload = await request.json();

  // listagem dos headers pegando os parametros do svix:
  const headersList = headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  }

  // incialização do webhook:
  const wh = new Webhook(webhookSecret)
  
  // incialização de evento normal com tipagens:
  let evt: Event | null = null;
  
  /**
   * Try com a verificação do webhook
   * caso ouver errors retorna nulo
   */
  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 })
  }

  // tipo dos eventos:
  const eventType: EventType = evt.type;

  /**
   * Um if que se for criação e customização de usuario:
   *  criar um novo usuario 
   *    ou 
   *  fazer update do usuario
   */
  if(eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      email_address,
      primary_email_address_id,
      ...atributes
    } = evt.data

    // iserir usuario no stripe:
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16"
    })

    const customer = await stripe.customers.create({
      name: `${first_name} ${last_name}`,
      email: EmailAddress ? email_address[0].email_address : ''
    })

    await prisma.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        stripeCustomerId: customer.id,
        atributes
      },
      update: {
        atributes
      }
    })
  }

  // se tudo deu certo status 200:
  return NextResponse.json({}, { status: 200 })
}

// tipos de requisição que são aceitos:
export const GET = handler;
export const POST = handler;
export const PUT = handler;