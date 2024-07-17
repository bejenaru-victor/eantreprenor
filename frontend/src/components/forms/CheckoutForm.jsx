'use client'

import { CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { data } = await axios.post(process.env.NEXT_PUBLIC_API_ROOT+'create-payment-intent/', {
      amount: 1000, // amount in cents
    });

    const clientSecret = data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*<CardElement />*/}
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment succeeded!</div>}
    </form>
  );
};

export default CheckoutForm;
