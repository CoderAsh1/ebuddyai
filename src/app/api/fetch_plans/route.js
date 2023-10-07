import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET(){
    try {
        let instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET })
        let plans = await instance.subscriptions.all()
        return NextResponse.json({data: plans},{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}