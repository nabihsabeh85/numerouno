import express from 'express';
import stripe from '../config/stripe.js';
import { db } from '../config/firebase.js';
import { sendOrderConfirmationEmail, sendStoreNotificationEmail } from '../config/email.js';

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment processing not available',
        message: 'Stripe is not configured. Please add Stripe credentials to .env file.'
      });
    }

    const { items, customerInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Calculate total
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Photo Print - ${item.size}`,
          description: `${item.filename} (Qty: ${item.quantity})`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/upload`,
      customer_email: customerInfo.email,
      metadata: {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone || '',
        items: JSON.stringify(items),
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook handler
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Parse items from metadata
      const items = JSON.parse(session.metadata.items);
      const totalPrice = session.amount_total / 100;

      // Create order in Firebase
      const orderRef = db.collection('orders').doc();
      const orderId = orderRef.id;

      const orderData = {
        orderId,
        customerName: session.metadata.customerName,
        customerEmail: session.metadata.customerEmail,
        customerPhone: session.metadata.customerPhone,
        items,
        totalPrice,
        status: 'Processing',
        paymentId: session.payment_intent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await orderRef.set(orderData);
      console.log('✅ Order saved to Firebase:', orderId);

      // Send emails
      await sendOrderConfirmationEmail({
        name: session.metadata.customerName,
        email: session.metadata.customerEmail,
        orderId,
        items,
        totalPrice,
      });

      await sendStoreNotificationEmail({
        name: session.metadata.customerName,
        email: session.metadata.customerEmail,
        phone: session.metadata.customerPhone,
        orderId,
        items,
        totalPrice,
      });

    } catch (error) {
      console.error('Error processing order:', error);
    }
  }

  res.json({ received: true });
});

// Get session details
router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

