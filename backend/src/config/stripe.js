import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

let stripe = null;

// Only initialize Stripe if we have a real API key
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe initialized');
} else {
  console.log('⚠️  Stripe not configured - payment features will not work');
  console.log('   To enable payments, add your Stripe key to .env file');
}

export default stripe;

