"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function Login() {
  const router = useRouter()
  const [user,setUser] = useState({email:"",password:""})
  const [loading,setLoading] = useState(false)

  async function handleLogin(e){
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post("/api/login",user)
      let userInfo = await axios.get("/api/user")
      if(!userInfo.isVerfied){
        await axios.put('/api/send_code',{email :user.email,type:"VERIFY"})
        toast.success("Code has been sent to your email.")
        return router.push("/verifyemail")
      }
      router.push(userInfo?.data?.user?.hasCompanion ? "/chat" : "/choose_companion")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error);
    }finally {setLoading(false)}
  }

  async function sendCode(){
    let data = await axios.put('/api/forget_password_code',{email: "ashutoshsasmal1@outlook.com"})
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7  lg:w-[30vw] min-w-[300px]">
        <div className="text-center font-bold text-xl ">ExamBuddyAI</div>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md">Email</span>
            </label>
            <input required autoFocus type="text" placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>setUser(prev=>({...prev,email:e.target.value}))}/>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold ">Password</span>
              <span className="label-text-alt font-semibold cursor-pointer" onClick={sendCode}>Forget Password ?</span>
            </label>
            <input required type="text" placeholder="Type here" className="input input-bordered w-full" 
            onChange={e=>setUser(prev=>({...prev,password:e.target.value}))}/>
          </div>
          {loading ? <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white">
            <span className="loading loading-spinner"></span>
          </button> :    
          <button className="btn w-full mt-4 bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white hover:bg-gradient-to-l from-voilet-600 via-pink-700 to-blue-600">Login</button> }
            <div className="text-center mt-5 text-sm text-slate-700">Don't have an Account ?</div>
            <Link href='/signup'>
            <button className="btn w-full mt-4 text-white bg-[#190978] hover:bg-[#211a47]" type="button">Register Now</button>
            </Link>
        </form>
      </div>
     <Toaster/>
    </div>
  )
}
