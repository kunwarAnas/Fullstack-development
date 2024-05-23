import nodemailer from 'nodemailer'

export const sendEmail = async (verificationUrl: string, user: any) => {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    };

    await transporter.sendMail(mailOptions);
}