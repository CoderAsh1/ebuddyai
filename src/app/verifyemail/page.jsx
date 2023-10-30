"use client"
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function VerifyEmail({searchParams}) {
  const router = useRouter()
  const {id , token} = searchParams
  const [loading,setLoading] = useState(false)
  const [code,setCode] = useState(token || "")
  const [user,setUser] = useState({})
  const [disabled,setDisabled] = useState(false)


  async function handleVerify(e){
    e.preventDefault()
    try {
      setLoading(true)

      if(moment().diff(moment.unix(user.verifyTokenExpiry), 'minutes') > 10){
        toast.error("Code has been expired !")
        return;
      }

      if(user.verifyToken !== +code){
        toast.error("Invalid Verification Code !")
        return;
      }

      await axios.put("/api/user",{isVerified: true})
      toast.success("Email verified.")
      router.push("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error);
    }finally {setLoading(false)}
  }

  async function resend(){
    try {
      if(!user?.email) return toast.error("Email does not exits!")
        setLoading(true)
        await axios.put('/api/send_code',{email :user.email,type:"VERIFY"})
        toast.success("Code has been resent to your email.")
        getUser()
        setDisabled(true)
        setTimeout(() => {
          setDisabled(false)
        }, 10000);
    } catch (error) {
        toast.error("Failed to send code !")
    }finally {setLoading(false)}
  }

  async function getUser(){
    try {
      let user = await axios.get("/api/user")
      if(user.data.user.isVerified){
        return router.push('/')
      }
      setUser(user.data.user)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7  lg:w-[30vw] min-w-[300px] text-center">
        <div className="text-center font-bold text-xl mb-4">Verify Email</div>
        <form onSubmit={handleVerify}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-md">Verification Code</span>
            </label>
            <input required autoFocus type="number" max={999999} min={100000} value={code} placeholder="Type here" className="input input-bordered w-full " 
            onChange={e=>e.target.value.length <=6 && setCode(e.target.value)}/>
          </div>
          {loading ? <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white">
            <span className="loading loading-spinner"></span>
          </button> :    
          <button className="btn w-full mt-4 bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white hover:bg-gradient-to-l from-voilet-600 via-pink-700 to-blue-600">Continue</button> }
           <button disabled={disabled} className="btn btn-sm cursor-pointer text-center mt-5  text-slate-700" onClick={resend}>{loading ? <span className="loading loading-dots loading-sm "></span> : "Resend Code"} </button>
        </form>
      </div>
      
     <Toaster/>
    </div>
  )
}
