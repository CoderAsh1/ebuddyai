"use client"
import axios from "axios";
import { useState } from "react";

export default function Signup() {

    const [user,setUser] = useState({username : "" , email:"" , password : ""})
    const handleSignup = async()=>{
        try {
            let res = await axios.post("/api/signup",user)
            console.log(res)
            console.log(user)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
  return (
   <div>hi
   </div>
  )
}
