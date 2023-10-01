import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log("Token:", token);

        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
        console.log("Decoded Token:", decodedToken);

        return decodedToken.id;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new Error("JWT verification failed");
    }
}
