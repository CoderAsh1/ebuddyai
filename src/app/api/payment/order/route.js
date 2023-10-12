import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(respose){
    try {
        let body = await respose.json()
        const {amount} = body
        console.log(amount)
        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        });

        const options = {
            amount: amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);
        if (!order) return NextResponse.json({error: error.message}, {status: 500})
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}