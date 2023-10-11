
"use client"
import { generateReferralCode } from "@/helper/generateReferralCode";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function Signup({searchParams}) {
  const router = useRouter()
  const {referral} = searchParams
  const [user,setUser] = useState({name : "",email:"",password:"",refferedBy : referral || "",phone:"+91",referralCode:""})
  const [loading,setLoading] = useState(false)


  async function handleSignup(e){
    e.preventDefault()
    try {
      setLoading(true)
      const indianPhoneNumberRegex =  /^(\+91|0)?[6-9]\d{9}$/;

      const phoneNumber = user.phone;
      if (!indianPhoneNumberRegex.test(phoneNumber)) {
        toast.error("Invalid phone number!");
        return;
      }

      let temp = structuredClone(user)
      let code = await referralCode()
      temp.referralCode = code
      await axios.post("/api/signup",temp)
      toast.success("User created successfully.")
      router.push("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error);
    }finally {setLoading(false)}
  }

  async function referralCode(){
    let res= generateReferralCode()
    return res;
   }

  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7 lg:w-[30vw] min-w-[300px]">
        <div className="text-center font-bold text-xl ">ExamBuddyAI</div>
        <form onSubmit={handleSignup}>
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
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold text-md ">Phone Number</span>
            </label>
            <input required type="tel" maxLength={13} placeholder="Type here" className="input input-bordered w-full"  value={user.phone}
            onChange={e=>setUser(prev=>({...prev,phone:e.target.value.length > 2 && +e.target.value ? e.target.value  : "+91"}))}/>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold text-md ">Referral Code</span>
            </label>
            <input value={user.refferedBy} type="text" placeholder="Type here" className="input input-bordered w-full" 
            onChange={e=>setUser(prev=>({...prev,refferedBy:e.target.value}))}/>
          </div>
          {loading ? <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 ">
            <span className="text-white loading loading-spinner"></span>
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