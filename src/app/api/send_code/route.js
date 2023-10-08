import { connect } from "@/dbConfig/dbConfig";
import { generateRandomSixDigitNumber } from "@/helper/generateRandom";
import { sendEmail } from "@/helper/sendMail";
import User from "@/models/userModel";
import moment from "moment";
import { NextResponse } from "next/server";

export async function PUT(request){
    try {
        await connect()
        const reqBody = await request.json()
        const { email,type} = reqBody
        let user = await User.findOne({email})
        let code =  generateRandomSixDigitNumber()

        await sendEmail({email, emailType: type,code , userId : user._id})
        if(type === "RESET"){
            await  User.updateOne(user,{forgotPasswordToken :code,forgotPasswordTokenExpiry : moment().add(10,"m").unix()})
        }else {
            await  User.updateOne(user,{verifyToken :code,verifyTokenExpiry : moment().add(10,"m").unix()})
        }
        user = await User.findOne({email})
        return NextResponse.json(user)

        
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}