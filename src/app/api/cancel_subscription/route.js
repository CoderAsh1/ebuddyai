import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(response){
    try {
        await connect()
        let {subscriptionId} = await response.json()
        let instance =  new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET })

        let res  = await instance.subscriptions.cancel(subscriptionId)
        await User.findOneAndUpdate({subscriptionId}, {isSubscribed: false,
            subscriptionId: null,
            subscriptionRenewsOn: null,
            subscriptionName: null,})
        return NextResponse.json({data :res , msg:"Subscription cancelled successfully ."},{status:200})
    } catch (error) {
        return NextResponse.json({error : error},{status:500})
    }
}