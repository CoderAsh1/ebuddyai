
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        await connect()
        const reqBody = await request.json()
        const {name, email, password ,referralCode,phone,refferedBy,image} = reqBody

        // const user = await User.findOne({
        //     $or: [
        //       { email: email },
        //       { phone: phone }
        //     ]
        //   });
        const user = await User.findOne({email : email});

        if(user){
            return NextResponse.json({error: "User already exists !",success:false}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User(reqBody)
        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}