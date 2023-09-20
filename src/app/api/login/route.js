import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server"

connect()

export async function POST(request){

    try {
        const {email,password} = await request.json()
        console.log(email,password)

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

        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET,{ expiresIn: '1h' })

        let response = NextResponse.json({message : "Login successful",success:true})
        response.cookies.set("token",token , {httpOnly:true})

        return response;

    } catch (error) {
           return NextResponse.json({error : error.message},{status:500}) 
    }
}