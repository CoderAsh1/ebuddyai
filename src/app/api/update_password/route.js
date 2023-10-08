import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import moment from "moment";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function PUT(request){
    try {
        await connect()
        const reqBody = await request.json()
        const { email , code , password} = reqBody

        let user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error : "User not found."},{status : 400})
        }

        if(moment().diff(moment.unix(user.verifyTokenExpiry), 'minutes') > 10){
            NextResponse.json({error : "Code Expired."},{status : 400})
          }
        if(user.forgotPasswordToken !== +code){
            return NextResponse.json({error : "Invaild Verification Code."},{status : 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        await User.updateOne(user,{password : hashedPassword,forgotPasswordToken:null,forgotPasswordTokenExpiry:null})
        return NextResponse.json({msg : "Password updated successfully."},{status : 200})

        
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}