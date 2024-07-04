'use client'

import Link from 'next/link'
import { useState } from 'react'
import AccountMenu from './navigation/AccountMenu'

import { useSession } from "next-auth/react"



function MenuItem({link, text}) {
    return (
        <li className='flex'>
            <div className='liner-wrapper relative flex'>
                <Link href={link} prefetch={false} className="block my-auto px-3 text-gray-900 rounded md:hover:bg-transparent md:p-0 transition-colors">
                    {text}
                </Link>
            </div>
        </li>
    )
}


export default function Navigation() {


    const [mobileNav, setMobileNav] = useState(false)
    const { data: session, status } = useSession()

    const toggleMenu = () => {
        setMobileNav(!mobileNav)
        console.log(mobileNav)
    }

    return <>
        <nav className={'backdrop-blur-md bg-[#ffffff90] border-b border-gray-200 z-[300] sticky top-0 md:relative w-full'}>
            <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl p-0">

                <Link href='/' className="flex items-center space-x-3 p-1 md:p-0 my-2">
                    <img src="https://wesoftware.ro/wp-content/uploads/2023/10/cropped-Untitled-design-82.png" className="h-12" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap "></span>
                </Link>

                <button type="button" onClick={toggleMenu} className="inline-flex items-center p-2 mr-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mega-menu-full" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`justify-between font-medium ${mobileNav || 'hidden'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col md:space-x-8 md:flex-row md:mt-0 md:border-0 z-[100]">
                        <MenuItem link='/courses' text='Courses' />
                        <MenuItem link='#' text='Resources' />
                        {session ? 
                            <>
                                <MenuItem link='/dashboard' text='Dashboard' />
                                <AccountMenu /> 
                            </>    
                        :
                        <>
                            <MenuItem link='/login' text='Login' />
                            {/*<li className='flex'>
                                <Link href='/contact' className="my-auto p-2 transition-colors bg-teal-400 text-white text-sm rounded-full hover:bg-teal-500">
                                    Get in touch
                                </Link>
                            </li>*/}
                        </>
                        }
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
}