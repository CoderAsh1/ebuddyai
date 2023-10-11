import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const { field ,value} = await request.json()
        await connect()
        let data = await User.find({[field]:value})
        return NextResponse.json({user: data},{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}


export async function PUT(request){
    try {
        const body = await request.json()
        await connect()
        await User.findByIdAndUpdate(body.id,body)
        return NextResponse.json({msg:"User successfully updated." , body: body },{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}