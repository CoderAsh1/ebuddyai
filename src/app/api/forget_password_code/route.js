import { connect } from "@/dbConfig/dbConfig";
import { generateRandomSixDigitNumber } from "@/helper/generateRandom";
import User from "@/models/userModel";
import moment from "moment";
import { NextResponse } from "next/server";

export async function PUT(request){

    
    try {
        await connect()
        const reqBody = await request.json()
        const { email} = reqBody
        let user = await User.findOne({email})
        await  User.updateOne(user,{forgotPasswordToken : generateRandomSixDigitNumber(),forgotPasswordTokenExpiry : moment().add(10,"m").unix()})
        user = await User.findOne({email})


        return NextResponse.json(user)

        
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}