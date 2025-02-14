import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Ensure correct Stripe API version
});

export default stripe;