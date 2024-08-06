import StripeWrapper from "@/components/utils/StripeWrapper";

export default function Page() {

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-2xl">
                Checkout
            </h1>
            <div className="my-6 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <h3 className="text-lg text-gray-700 tracking-tight mb-10">
                <span className='font-medium'>20$</span> - 
                <span className='font-bold'> SUBSCRIPTION FOR 30 DAYS</span>
            </h3>
            <StripeWrapper metadata={
                {user: 1, price: 2000, 'subscription': true}
            } />
        </div>
    </>
}
