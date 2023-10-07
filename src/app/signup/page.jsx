"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function Login() {
  const router = useRouter()
  const [user,setUser] = useState({name : "",email:"",password:"",})
  const [loading,setLoading] = useState(false)

  async function handleLogin(e){
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post("/api/signup",user)
      toast.success("User created Successfully.")
      router.push("/login")
    } catch (error) {
      toast.error(error.response.data.error);
    }finally {setLoading(false)}
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7 lg:w-[30vw] min-w-[300px]">
        <div className="text-center font-bold text-xl ">ExamBuddyAI</div>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md ">Name</span>
            </label>
            <input required autoFocus type="text" placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>setUser(prev=>({...prev,name:e.target.value}))}/>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md ">Email</span>
            </label>
            <input required autoFocus type="text" placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>setUser(prev=>({...prev,email:e.target.value}))}/>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold text-md ">Password</span>
            </label>
            <input required type="text" placeholder="Type here" className="input input-bordered w-full" 
            onChange={e=>setUser(prev=>({...prev,password:e.target.value}))}/>
          </div>
          {loading ? <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 ">
            <span className="loading loading-spinner"></span>
          </button> :    
          <button className="btn w-full mt-4 bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600  hover:bg-gradient-to-l from-voilet-600 via-pink-700 to-blue-600 text-white">Signup</button> }
            <div className="text-center mt-5 text-sm text-slate-700">Already have an Account ?</div>
            <Link href='/login'>
            <button className="btn w-full mt-4  bg-[#190978] hover:bg-[#211a47] text-white" type="button">Login</button>
            </Link>
        </form>
      </div>
     <Toaster/>
    </div>
  )
}
