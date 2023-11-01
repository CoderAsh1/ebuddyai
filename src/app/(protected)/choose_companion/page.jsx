"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Tilt from "react-parallax-tilt";


export default function page() {
    const router = useRouter()
    const [companion,setCompanion] = useState(null)

    async function updateUserInfo(){
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
    <div className="w-screen h-full card_bg text-center text-white max-h-full">
      <h1 className="p-7 font-bold">Hi , Welcome to Exam Buddy !</h1>
      <h3>Choose your Area of Interest</h3>
      <div className="md:flex md:justify-between md:p-20  gap-10 items-center w-full">
        <Tilt>
          <div className="card max-w-[300px] h-96 mx-auto my-6 text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>{
            document.getElementById("my_modal_1").showModal()
            setCompanion("SSC")}}>
            <figure className="h-72">
              <img
                style={{height:'100%'}}
                src="SSC.jpg"
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
          <div className="card max-w-[300px] h-96 mx-auto text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>{
            document.getElementById("my_modal_1").showModal()
            setCompanion("NEET")}}>
            <figure className="h-72">
              <img
                style={{height:'100%'}}
                src="./NEET.jpg"
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
          <div className="card max-w-[300px] h-96  mx-auto text-black bg-base-100 shadow-xl my-6 bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>{
            document.getElementById("my_modal_1").showModal()
            setCompanion("JEE")}}>
            <figure className="h-72">
              <img
              style={{height:'100%'}}
                src="JEE.jpg"
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
        <Tilt>
          <div className="card max-w-[300px] h-96  mx-auto text-black bg-base-100 shadow-xl my-6 bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>{
            document.getElementById("my_modal_1").showModal()
            setCompanion("OTHER")}}>
            <figure className="h-72">
              <img
              style={{height:'100%'}}
                src="robot.jpg"
                alt="ssc"
              />
            </figure>
            <div className="card-body">
              <h2 className="mx-auto card-title p-0 m-0 text-slate-700">
                Hybrid
              </h2>
            </div>
          </div>
        </Tilt>
      </div>
      <Toaster/>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-black font-bold text-lg">
            Do you really want to proceed with this ?
          </h3>
          <p className="text-black py-4">
            You won't be able to change it later.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={updateUserInfo}>
                Yes
              </button>
              <button className="btn bg-black text-white ms-1">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
