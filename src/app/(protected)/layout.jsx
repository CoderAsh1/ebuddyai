"use client"

import Navbar from "@/components/Navbar"
import axios from "axios"
import { useRouter } from "next/navigation"


export const metadata = {
  title: 'Exam Buddy',
  description: 'Crack Exam with me.',
}



export default function RootLayout({ children }) {
  const router = useRouter()

async function checkAuth(){
  let user = await axios.get("/api/user")
  if(!user.data.user.isVerified){
    return router.push('/verifyemail')
  }
}

checkAuth()

  return (<div> <Navbar/> {children}</div>)
}
