import moment from "moment";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req){
    try {
        const reqBody = await req.json()
        const { name ,email } = reqBody

        let instance =  new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET })

        let customer = await instance.customers.create({
            name: name,
            email: email,
            fail_existing: "0",
        })

        let res = await instance.subscriptions.create({
        plan_id: process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID,
        customer_notify: 1,
        quantity: 1,
        total_count: 12,
        start_at: moment().add(3,"m").unix(),
        customer_id:customer.id
        })
   
        return NextResponse.json({data :res},{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}