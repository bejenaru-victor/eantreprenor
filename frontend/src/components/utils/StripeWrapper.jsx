'use client'

import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/utils/stripe';
import CheckoutForm from '@/components/forms/CheckoutForm';
import { useEffect, useState } from 'react';

const stripePromise = getStripe();

export default function StripeWrapper() {

    const [clientSecret, setClientSecret] = useState(null)

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_ROOT+'create-payment-intent/', {
            method: "GET",
            //body: JSON.stringify({amount: '1000'})
        }).then(async (r) => {
            const { client_secret } = await r.json()

            setClientSecret(client_secret)
        })
    }, [])

    return <>
        {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm />
        </Elements>
        )}
    </>
}
