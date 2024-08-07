import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import StripeWrapper from "@/components/utils/StripeWrapper";


export default async function Page() {

    const session = await getServerSession(authOptions)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-2xl">
                Checkout
            </h1>
            <div className="my-6 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <h3 className="text-lg text-gray-700 tracking-tight mb-10">
                <span className='font-medium'>20$</span> - 
                <span className='font-bold'> SUBSCRIBE FOR 30 DAYS</span>
            </h3>
            <StripeWrapper metadata={
                {user: session?.user?.id || null, price: 2000, 'subscription': true}
            } />
        </div>
    </>
}
