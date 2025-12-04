import { serve } from "std/server";
import Stripe from "stripe";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY");
if(!STRIPE_SECRET) {
  console.error("Missing STRIPE_SECRET_KEY");
}

serve(async (req) => {
  try {
    const body = await req.json();
    const stripe = new Stripe(STRIPE_SECRET, { apiVersion: "2022-11-15" });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items,
      success_url: body.success_url,
      cancel_url: body.cancel_url,
    });
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
