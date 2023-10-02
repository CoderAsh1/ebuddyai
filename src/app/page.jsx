import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className='h-full p-5 bg-blue-100 card_bg'>
      <header className='text-slate-700'>
        <nav className='card_blur p-5 flex justify-between items-center'>
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
      <div className='flex text-center justify-center items-center h-[40vh]'>
        <div className='text-white'>
          <h1 className='text-6xl mb-3'>Welcome to ExamBuddy AI</h1>
          <p className='text-slate-900 text-xl '>One stop solution to crack exams with ease.</p>
        </div>
      </div>
      <div className='flex gap-10'>
        <div className="rounded-xl p-6 bg-white phone-1 w-4/12 flex flex-col gap-4">
          <h1 className='font-bold'>Free Plan</h1>
          <p>You will be able to access the companion.</p>
          <div><span className='font-bold text-xl'>&#8377; 0</span>/month</div>
          <p>&#x2714; Free</p>
          <Link href="/login" className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>Chat Now
          </Link>
        </div>
        <div className="rounded-xl p-6 bg-white phone-1 w-4/12 flex flex-col gap-4">
          <h1 className='font-bold'>Premium Plan</h1>
          <p>You will be able to access the companion 30 days for free from the data of Joining </p>
          <div><span className='font-bold text-xl'>&#8377; 600</span>/month</div>
          <p>&#x2714; 24/7 Customer Support</p>
          <Link href="/" className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>Get Plan
          </Link>
        </div>
        <div className="rounded-xl p-6 bg-white phone-1 w-4/12 flex flex-col gap-4">
          <h1 className='font-bold'>Supreme Plan</h1>
          <p>You will be able to access the companion 30 days for free from the data of Joining </p>

          <div><span className='font-bold text-xl'>&#8377; 10000</span>/lifetime</div>
          <p>&#x2714; 24/7 Customer Support</p>
          <p>&#x2714; LifeTime Access</p>
          <p>&#x2714; Custom ChatBot With Own Data</p>
          <Link href="/" className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>Get Plan
          </Link>
        </div>
      </div>
     <Toaster/>
    </div>
  )
}
