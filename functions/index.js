const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();
const db = admin.firestore();
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.createCheckout = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated');
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: data.priceId, quantity: 1 }],
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
    metadata: { uid: context.auth.uid }
  });
  return { url: session.url };
});

exports.billingPortal = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated');
  const portal = await stripe.billingPortal.sessions.create({
    customer: data.customerId,
    return_url: data.returnUrl
  });
  return { url: portal.url };
});

exports.webhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const uid = session.metadata.uid;
    await db.doc(`users/${uid}`).update({
      subscriptionTier: 'Team',
      seatsAllowed: Number(session.metadata.seats || 1),
      seatsUsed: 1
    });
  }
  res.sendStatus(200);
});
