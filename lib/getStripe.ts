import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripe: Stripe;

const getStripe = async () => {
  if (!stripe)
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  return stripe;
};

export default getStripe;
