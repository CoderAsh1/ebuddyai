import nodemailer from 'nodemailer';

export const sendEmail = async({email, emailType ,code,userId}) => {
    try {
        const hashedToken = code
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
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset_password"}?token=${hashedToken}&id=${emailType === "VERIFY" ? userId : email}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the code  in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset_password"}?code=${hashedToken}&id=${emailType === "VERIFY" ? userId : email}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}