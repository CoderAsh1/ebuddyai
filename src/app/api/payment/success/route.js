import { NextResponse } from "next/server";

export async function POST(response){
    try {
        // getting the details back from our font-end
        const reqBody = await response.json()
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = reqBody;
        // const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        // shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        // const digest = shasum.digest("hex");
        // if (digest !== razorpaySignature)
        //     return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        return NextResponse.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}