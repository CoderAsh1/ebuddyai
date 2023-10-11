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
    setLoader(true)  
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

  useEffect(() => {
    getUser()
  }, [])

  if(loader) return <span className="loading loading-dots loading-sm m-5 "></span>;
  
  return (
    <div className="md:navbar p-2 bg-blue-100 shadow-md text-black">
        <div className='md:w-fit mr-5'>
            <Link href="/"><b>ExamBuddy.AI</b>
            <div className='text-[10px] md:text-end'>Let's Crack it !</div>
            </Link>
        </div>
      <div className='md:text-lg'><span className='text-[13px]'>
        Welcome,<span className='ms-1 username'>{loader ? <span className="loading loading-dots loading-sm "></span> : user?.name}</span> {!user.isSubscribed && <span className='md:hidden font-bold'> (Free Plan)</span>}
      </span>
        </div>

      <div className="md:navbar-end ml-auto gap-2">
        {!user?.isSubscribed &&(
          <>
          <button className='hidden md:block'>
            Free till {moment(user.freeTill * 1000).format("DD-MM-YYYY")}
          </button>
          <button onClick={()=>router.push("/")} className="btn text-white bg-[#190978] hover:bg-[#211a47] mr-4 hidden md:block">
          Subscribe Now
        </button>
          </>
         )}
         <button onClick={()=>window.location.reload()} title='Click if chat does not appear'><img src='./reload.png'/></button>
        <div className="dropdown dropdown-end md:relative absolute right-0 top-0">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.image || "./user.png"} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={()=>router.push('/')}><a>Home</a></li>
            <li onClick={()=>router.push('/chat')}><a>Chat</a></li>
            <li onClick={()=>router.push('/profile')}><a>Profile</a></li>
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
