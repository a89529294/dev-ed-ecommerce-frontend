// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  const user = session?.user;

  const checkoutSession: Partial<Stripe.Checkout.Session> = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    allow_promotion_codes: true,
    shipping_options: [
      //@ts-ignore
      { shipping_rate: "shr_1LlwEuGSMnogWf584yzt5Jj7" },
    ],
    line_items: req.body.map((item: any) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image.data.attributes.formats.thumbnail.url],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.qty,
      };
    }),
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/`,
  };

  if (req.method === "POST") {
    try {
      if (user)
        checkoutSession.customer =
          user[`${process.env.BASE_URL}/stripe_customer_id`];

      const session = await stripe.checkout.sessions.create(checkoutSession);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
