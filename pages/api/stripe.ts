// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
  // @ts-ignore
  apiVersion: null,
});
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ name: string }>
) {
  res.status(200).json({ name: "John Doe" });
}
