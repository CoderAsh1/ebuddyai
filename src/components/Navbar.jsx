'use client'

import axios from 'axios'
import moment from 'moment/moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [user,setUser] = useState([])
  const [loader,setLoader] = useState(true)

async function getUser(){
    try {   
    let user = await axios.get("/api/user")
    setUser(user.data.user)
    } catch (error) {
      console.log(error,"this is the error")
      handleLogout()
    }finally{setLoader(false)}
  }

async function handleLogout(){
  try {
    await axios.get("/api/logout")
    router.push("/login")
  } catch (error) {
    console.log(error)
  }
}


async function loadScript(src){

}


async function handlePayment(){
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  if(!res){
    console.log("Payment Failed.")
  }
}

  useEffect(() => {
    getUser()
  }, [])
  


  
  return (
    <div className="navbar bg-blue-100 shadow-md text-black">
        <div className='w-fit mr-5'>
            <Link href="/"><b>ExamBuddy.AI</b>
            <div className='text-[10px] text-end'>Let's Crack it !</div>
            </Link>
        </div>
      <div>Welcome, <span className='ms-2 username'>{loader ? <span className="loading loading-dots loading-sm "></span> : user?.username}</span></div>
      <div className="navbar-end ml-auto">
        
        {!user?.isSubscribed &&(
          <button className=" mr-4">
            Free Credits Expires on {moment(user.createdAt).add(30,"d").format("DD-MM-YY")}
          </button>
          )}
          <button onClick={handlePayment} className="btn bg-[#5038ff] hover:bg-[#382b98] text-white mr-4">
          Subscribe Now
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://th.bing.com/th/id/OIP.1nWRQ7r_1nEVJ6sdz_zwkwHaE8?pid=ImgDet&rs=1" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
