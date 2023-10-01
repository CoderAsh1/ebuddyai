"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Tilt from "react-parallax-tilt";

export default function page() {
    const router = useRouter()
    async function updateUserInfo(companion){
        try {
           let user = await axios.get("/api/user")
           if(user.data.user.hasCompanion){
            toast.error("Companion Already Exists!")
            router.push("/chat")
            return;
           }

            let data= {hasCompanion : true,companion}
            await axios.put("/api/user",data)
            toast.success("Companion Selected Successfully.") 
            router.push("/chat")
        } catch (error) {
            toast.error("Soemthing Went Wrong!")
            console.log(error)
        }
    }
  return (
    <div className="w-screen h-screen card_bg text-center text-white max-h-full">
      <h1 className="p-7 font-bold">Hi , Welcome to Exam Buddy !</h1>
      <h3>Choose your Area of Interest</h3>
      <div className="flex justify-between p-20 flex-wrap gap-10">
        <Tilt>
          <div className="card w-80 text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("SSC")}>
            <figure>
              <img
                src="https://th.bing.com/th/id/OIP.MFYqGPYOJTpFVE_A52C1-wHaGo?pid=ImgDet&rs=1"
                alt="ssc"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title p-0 m-0 text-slate-700">
                Staff Selection Commission
                <div className="badge">NEW</div>
              </h2>
            </div>
          </div>
        </Tilt>

        <Tilt>
          <div className="card w-80 text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("NEET")}>
            <figure>
              <img
                src="https://th.bing.com/th/id/OIP.MFYqGPYOJTpFVE_A52C1-wHaGo?pid=ImgDet&rs=1"
                alt="ssc"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title p-0 m-0 text-slate-700">
                National Entrance cum Eligibility Test
              </h2>
            </div>
          </div>
        </Tilt>

        <Tilt>
          <div className="card w-80 text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("JEE")}>
            <figure>
              <img
                src="https://th.bing.com/th/id/OIP.MFYqGPYOJTpFVE_A52C1-wHaGo?pid=ImgDet&rs=1"
                alt="ssc"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title p-0 m-0 text-slate-700">
                Joint Entrance Examination
              </h2>
            </div>
          </div>
        </Tilt>
      </div>
      <Toaster/>
    </div>
  );
}
