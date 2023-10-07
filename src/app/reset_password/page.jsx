"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function ResetPassword() {
  const router = useRouter()
  const [user,setUser] = useState({email:"",password:"",code : ""})
  const [loading,setLoading] = useState(false)

  async function handleResetPassword(e){
    e.preventDefault()
    try {
      setLoading(true)
      let data = await axios.put("/api/update_password",user)
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error);
    }finally {setLoading(false)}
  }


  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7  lg:w-[30vw] min-w-[300px]">
        <div className="text-center font-bold text-xl ">ExamBuddyAI</div>
        <form onSubmit={handleResetPassword}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md">Email</span>
            </label>
            <input required autoFocus type="text" placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>setUser(prev=>({...prev,email:e.target.value}))}/>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md">Code</span>
            </label>
            <input required autoFocus type="number" placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>setUser(prev=>({...prev,code:+e.target.value}))}/>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold ">New Password</span>
            </label>
            <input required type="text" placeholder="Type here" className="input input-bordered w-full" 
            onChange={e=>setUser(prev=>({...prev,password:e.target.value}))}/>
          </div>
          {loading ? <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white">
            <span className="loading loading-spinner"></span>
          </button> :    
          <button className="btn w-full mt-4 bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white hover:bg-gradient-to-l from-voilet-600 via-pink-700 to-blue-600">Reset Password</button> }
        </form>
      </div>
     <Toaster/>
    </div>
  )
}