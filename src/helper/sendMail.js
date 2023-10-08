import User from "@/models/userModel";
import nodemailer from 'nodemailer';
import { generateRandomSixDigitNumber } from './generateRandom';
import moment from "moment";


export const sendEmail = async({email, emailType, userId ,code}) => {
    try {
        const hashedToken = code

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: moment().add(10,"m").unix()})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: moment().add(10,"m").unix()})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b744bf0d593449",
              pass: "1f03d11944a5ed"
            }
          });

        const mailOptions = {
            from: 'support@exambuddyai.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the code  in your browser. <br> ${process.env.DOMAIN}/verifyemail?code=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}