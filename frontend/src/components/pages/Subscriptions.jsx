'use client'

import { get_access_token } from '@/utils/fetch/token';
import React, { useState, useEffect } from 'react';

const AccountSubscription = ({subscription}) => {
    return (
      <section className='mb-10'>
        <hr />
        <h4>
          <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
            {subscription.id}
          </a>
        </h4>
  
        <p>
          Status: {subscription.status}
        </p>
  
        <p>
          Card last4: {subscription.default_payment_method?.card?.last4}
        </p>
  
        <p>
          Current period end: {(new Date(subscription.current_period_end * 1000).toString())}
        </p>
  
        {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
        <a href={'/cancel'}>Cancel</a>
      </section>
    )
  }

export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const accessToken = await get_access_token()
        const subscriptions = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`subscriptions/`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        ).then(r => r.json());

        console.log(subscriptions)
  
        setSubscriptions(subscriptions.data);
      }
      fetchData();
    }, []);
  
    if (!subscriptions) {
      return '';
    }
  
    return (
      <div>
        <h1>Account</h1>
  
        <a href="/prices">Add a subscription</a>
        <a href="/">Restart demo</a>
  
        <h2>Subscriptions</h2>
  
        <div id="subscriptions">
          {subscriptions.map(s => {
            return <AccountSubscription key={s.id} subscription={s} />
          })}
        </div>
      </div>
    );
}