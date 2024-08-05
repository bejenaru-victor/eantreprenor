'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'
// import required modules
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeSlider() {
    return <>
        <Swiper
        navigation={true} pagination={true}
        modules={[/*Navigation,*/ Pagination]}
        className={'rounded-lg overflow-hidden'}
        >
            <SwiperSlide>
                <div className='absolute w-full h-full flex'>
                    <div className='ml-20 my-auto max-w-[50%] bg-gray-800 text-white backdrop-blur-sm bg-opacity-85 px-10 py-8 rounded-lg'>
                        <span className='font-light text-3xl'>Eantreprenor</span><br/>
                        <span className='font-bold'>by WeSoftware</span>
                        <div className="my-4 bg-white w-12 h-[0.2rem] rounded-full"></div>
                        <p>Are you ready to turn your ideas into reality? Our platform offers comprehensive courses designed to empower aspiring entrepreneurs like you. Whether you're just starting out or looking to scale your business, our expert-led lessons and hands-on resources provide the guidance you need to succeed.
                        </p>
                        <div className='flex mt-8'>
                            <Link href={`/dashboard/course/12/checkout`}>
                                <div className="px-5 py-2 text-sm bg-emerald-700 text-white font-medium rounded-md cursor-pointer hover:bg-emerald-800 transition-colors">
                                    Subscribe for full access
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src='/banner_1.webp' />
            </SwiperSlide>
            <SwiperSlide><img src='/banner_2.webp' /></SwiperSlide>
            <SwiperSlide><img src='/banner_3.webp' /></SwiperSlide>
        </Swiper>
    </>
}