"use client"

import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"


export default function page() {

  const [user,setUser] = useState({})
  const [loader,setLoader] = useState(true)

async function getUser(){
    try {   
    let user = await axios.get("/api/user")
    setUser(user.data.user)
    } catch (error) {
      console.log(error,"this is the error")
    }finally{setLoader(false)}
  }

  useEffect(() => {
    getUser()
  }, [])
  
  
  return (
    <div className="flex justify-center items-center text-center h-[90vh]">
      {(!user?.isSubscribed && moment(user.createdAt).add(30,"d").format("DD-MM-YY") === moment().format("DD-MM-YY")) ||  
      moment(user.subscriptionExpireOn).add(30,"d").format("DD-MM-YY") === moment().format("DD-MM-YY")
      ? 
      <div className="flex justify-center items-center flex-col">
        <img src="./no_payment.webp" alt="no" height={100} width={100}/>
        <p className="mb-3">Credits Expired</p>
       <div> Please <button className="btn-sm rounded-lg  bg-[#5038ff] hover:bg-[#382b98] text-white">Subscribe</button> to continue</div>
      </div>
      : (
        <div className="bg-blue-100 ">
      <iframe
        data-retune-chat={process.env.RETUNE_ID}
        className='w-[100vw] h-[90vh]'
      ></iframe>
      <script
        id="retune.so/frame"
        src={`https://retune.so/api/script/chat.js?iframe&id=${process.env.RETUNE_ID}`}
        async
      ></script>
        </div>

      )}
   
    </div>
  )
}
