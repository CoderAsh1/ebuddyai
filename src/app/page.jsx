import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className='h-screen'>
      <header className='text-white absolute top-0 z-50 w-screen'>
        <nav className='w-full card_blur p-5 flex justify-between items-center'>
          <div className='w-fit'>
            <Link href="/"><b>ExamBuddy.AI</b>
            <div className='text-[10px] text-end'>Let's Crack it !</div>
            </Link>
          </div>
          <div className='flex gap-7'>
            {/* <Link href='/'>Home</Link>
            <Link href='/'>Features</Link>
            <Link href='/'>Pricing</Link>
            <Link href='/'>Contact Us</Link> */}
          </div>
          <Link href="/login">
            <button className='p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white' >Sign In</button>
          </Link>
        </nav>
      </header>
     <div className='text-white flex justify-between items-center relative'>
      <div className='absolute top-60 left-8'>
        <h1 className='text-[30px] lg:text-[40px] leading-snug slogan'> <span>AI Powered Companions</span><br/> to Crack Your Exams</h1>
        <div className='mt-10 flex h-14'>
        <input type="email" className='rounded-xl p-2 px-5 flex-1 text-black' placeholder='Enter Email'/>
        <button className='p-2 bg-[#331097] hover:bg-[#290c78] rounded-xl ms-4'>Get Started</button>
        </div>
      </div>
      <div className='h-[30px] w-full'>
        <img src="https://itroos.net/wp-content/uploads/2020/10/chatbot-banner-resize.jpg" alt="banner" style={{height:"90vh", width:"100vw",objectFit:"cover",}}/>
      </div>
     </div>
     <Toaster/>
    </div>
  )
}
