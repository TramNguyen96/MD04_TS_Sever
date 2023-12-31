import nodemailer from 'nodemailer';

interface MailOption{
    to: string, // Người nhận
    subject: string, // Chủ Đề
    html?: string, // Template HTML
    text?: string // Văn Bản
}

import emailConfirm from './templates/emailConfirm'
import emailOtp from './templates/emailOtp'
export const templates = {
    emailConfirm,
    emailOtp
}

export default {
    sendMail: async (mailOption: MailOption) => {
        try {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                }
            });
            
            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption
            });

            return true
        }catch (err) {
            return false
        }
    }
}
