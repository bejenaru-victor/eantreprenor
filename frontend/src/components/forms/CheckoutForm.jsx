'use client'

import { CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import axios from 'axios'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
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

  return <>
    <form onSubmit={handleSubmit}>
      {/*<CardElement />*/}
      <PaymentElement />
      <button type="submit" disabled={!stripe}
        className='mt-10 px-5 py-3 bg-emerald-600 rounded-lg text-white font-medium text-xl hover:bg-emerald-700 transition-colors'>
        Pay
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment succeeded!</div>}
    </form>
  </>
}
