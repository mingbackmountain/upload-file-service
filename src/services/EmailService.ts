import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    sendNotification(to:string,subject:string,text:string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:to,
            subject:subject,
            text:text,
        }

        return this.transporter.sendMail(mailOptions)
    }
}

export default EmailService;