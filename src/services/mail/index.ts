import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:process.env.VITE_MAIL_SERVICE,
    auth: {
        user: process.env.VITE_MAIL_USERNAME,
        pass: process.env.VITE_MAIL_PASSWORD
    }
})

async function sendMail(to:string, subject:string, html:string, from:any = process.env.MAIL_USERNAME) {
    try {
        var mailOptions = {
            from,
            to,
            subject,
            html
        };
        await transporter.sendMail(mailOptions);
        return true
    } catch (err) {
        console.log(err);
        return false
    }
}
export default {sendMail};