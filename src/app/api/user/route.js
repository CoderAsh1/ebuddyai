
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


export async function GET(request){
    
    try {
        await connect();
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId)
        return NextResponse.json({
            mesaaage: "User found",
            user: user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}

export async function PUT(request) {
    try {
        const reqBody = await request.json()
        const userId = await getDataFromToken(request);
 
        let user = await User.findByIdAndUpdate(userId, reqBody);

        return NextResponse.json({
            message: "User updated successfully",
            user:user
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}