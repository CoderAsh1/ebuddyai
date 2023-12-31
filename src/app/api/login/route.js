import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server"


export async function POST(request){
    
    try {
        await connect()
        const {email,password} = await request.json()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User doesn't exists",success:false}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword) return NextResponse.json({error:"Invalid Password !"}, {status : 400})

        const tokenData = {
            id : user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_SECRET,{ expiresIn: '30d' })

        let response = NextResponse.json({message : "Login successful",success:true})
        response.cookies.set("token",token , {httpOnly:true})

        return response;

    } catch (error) {
           return NextResponse.json({error : error.message},{status:500}) 
    }
}