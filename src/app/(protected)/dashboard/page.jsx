"use client"

import axios from 'axios'
import React, { useEffect } from 'react'

export default function page() {

  async function getUser(){
    console.log("hji")
    try {   
    let user = await axios.get("/api/getUser")
    console.log(user)
      
    } catch (error) {
      console.log(error,"this is the error")
    }
  }
  useEffect(() => {
  getUser()
    
  }, [])
  
  return (
    <div>
    {/* <iframe
      data-retune-chat="11ee5901-8d11-3aa0-a0a9-93cb98df2a4d"
      className='w-[99vw] h-[90vh]'
    ></iframe>
    <script
      id="retune.so/frame"
      src="https://retune.so/api/script/chat.js?iframe&id=11ee5901-8d11-3aa0-a0a9-93cb98df2a4d"
      async
    ></script> */}
    hi
    </div>
  )
}
