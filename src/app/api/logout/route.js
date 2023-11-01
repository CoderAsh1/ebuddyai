import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("userId", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("next-auth.session-token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("next-auth.callback-url", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("next-auth.csrf-token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("__Secure-next-auth.session-token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        response.cookies.set("__Secure-next-auth.callback-url", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}