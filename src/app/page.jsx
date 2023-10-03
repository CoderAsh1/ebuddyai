"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function getUser(){
      try {
        let user = await axios.get("/api/user")
        setUser(user.data.user)
      } catch (error) {
        console.log(error)
      }finally{setLoading(false)}
    }

    getUser()
  },[])


  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

async function displayRazorpay(total) {
  try {
    setLoading(true)
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("/api/payment/order",{amount : total})

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "ExamBuddy AI.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("api/payment/success", data);

          alert(result.data.msg);
      },
      prefill: {
          name: user.username,
          email: user.email,
          contact: "9999999999",
      },
      notes: {
          address: "Rourkela",
      },
      theme: {
          color: "#61dafb",
      },
    };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
  } catch (error) {
      console.log(error)
    }finally{setLoading(false)}
}

  return (
    <div className='h-full p-5 bg-blue-100 card_bg'>
  <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <header className='text-slate-700'>
        <nav className='card_blur p-5 flex justify-between items-center'>
          <div className='w-fit'>
            <Link href="/"><b>ExamBuddy.AI</b>
            <div className='text-[10px] text-end'>Let's Crack it !</div>
            </Link>
          </div>
          <div className='flex gap-7'>
          </div>
          {loading ?  <span className="loading loading-dots loading-sm "></span> :  <>
          {user ? <h4>Welcome, {user?.username}</h4> :  <Link href="/login">
            <button className='p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white' >Sign In</button>
          </Link>}
          </>}
         
         
        </nav>
      </header>
      <div className='flex text-center justify-center items-center h-[40vh]'>
        <div className='text-white'>
          <h1 className='lg:text:6xl md:text-4xl text-4xl mb-3 font-semibold'>Welcome to ExamBuddy AI</h1>
          <p className='text-slate-700 text-xl font-bold'>One stop solution to crack exams with ease.</p>
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-10 '>
        <div className="rounded-xl p-6 bg-white phone-1 max-w-sm flex flex-col gap-4">
          <h1 className='font-bold'>Free Plan</h1>
          <p>You will be able to access the companion.</p>
          <div><span className='font-bold text-xl'>&#8377; 0</span>/month</div>
          <p>&#x2714; Free</p>
          <Link href="/login" className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>Chat Now
          </Link>
        </div>
        <div className="rounded-xl p-6 bg-white phone-1 max-w-sm flex flex-col gap-4">
          <h1 className='font-bold'>Premium Plan</h1>
          <p>You will be able to access the companion 30 days for free from the data of Joining </p>
          <div><span className='font-bold text-xl'>&#8377; 600</span>/month</div>
          <p>&#x2714; 24/7 Customer Support</p>
          <button onClick={()=> user ? displayRazorpay(60000) : router.push("/login")} className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>{loading ?  <span className="loading loading-dots loading-sm "></span> : "Get Plan"} 
          </button>
        </div>
        <div className="rounded-xl p-6 bg-white phone-1 max-w-sm flex flex-col gap-4">
          <h1 className='font-bold'>Supreme Plan</h1>
          <p>You will be able to access the companion 30 days for free from the data of Joining </p>

          <div><span className='font-bold text-xl'>&#8377; 10000</span>/lifetime</div>
          <p>&#x2714; 24/7 Customer Support</p>
          <p>&#x2714; LifeTime Access</p>
          <p>&#x2714; Custom ChatBot With Own Data</p>
          <button onClick={()=>user ? displayRazorpay(1000000) : router.push("/login")} className='mt-auto p-2 px-5 bg-[#331097] hover:bg-[#290c78] transition-colors rounded-md text-white font-bold text-center'>{loading ?  <span className="loading loading-dots loading-sm "></span> : "Get Plan"} 
          </button>
        </div>
      </div>
     <Toaster/>
    </div>
  )
}






