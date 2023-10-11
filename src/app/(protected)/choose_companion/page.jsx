"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Tilt from "react-parallax-tilt";


export default function page() {
    const router = useRouter()

    async function updateUserInfo(companion){
      let conf = confirm("Are you Sure ? You won't be able to change this later !")
      if(conf){
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
        
    }

  return (
    <div className="w-screen h-full card_bg text-center text-white max-h-full">
      <h1 className="p-7 font-bold">Hi , Welcome to Exam Buddy !</h1>
      <h3>Choose your Area of Interest</h3>
      <div className="md:flex md:justify-between md:p-20  gap-10 items-center w-full">
        <Tilt>
          <div className="card max-w-[300px] h-96 mx-auto my-6 text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("SSC")}>
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
          <div className="card max-w-[300px] h-96 mx-auto text-black bg-base-100 shadow-xl bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("NEET")}>
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
          <div className="card max-w-[300px] h-96  mx-auto text-black bg-base-100 shadow-xl my-6 bg-gradient-to-r from-slate-200 to-blue-300 cursor-pointer hover:shadow-blue-300" onClick={()=>updateUserInfo("JEE")}>
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
      </div>
      <Toaster/>
    </div>
  );
}
