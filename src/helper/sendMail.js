import nodemailer from 'nodemailer';

export const sendEmail = async({email, emailType ,code,userId}) => {
    try {
        const hashedToken = code
          var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "api",
              pass: process.env.NEXT_PUBLIC_MAIL_SECRET
            }
          });

        const mailOptions = {
            from: 'support@exambuddyai.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset_password"}?token=${hashedToken}&id=${emailType === "VERIFY" ? userId : email}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the code  in your browser. <br> ${process.env.NEXT_PUBLIC_DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset_password"}?code=${hashedToken}&id=${emailType === "VERIFY" ? userId : email}
            </p><br/>Code is ${hashedToken} `
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}