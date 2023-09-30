import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function GET(request){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId)
        return NextResponse.json({
            mesaaage: "User found",
            user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export async function POST(request){
    const reqBody = await request.json()
    const {username, password} = reqBody
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findByIdAndUpdate(userId,{ isSubscribed :true . companion  : })
        return NextResponse.json({
            mesaaage: "User found",
            user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}