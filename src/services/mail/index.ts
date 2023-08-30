import nodemailer from 'nodemailer';
export default {
    sendMail: async (mailOptions: any) => {
        try {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                }
            });
            
            await transporter.sendMail({
                from: 'tramzan18@gmail.com',
                ...mailOptions
            });

            return true
        }catch (err) {
            return false
        }
    }
}

// {
//     to: "mieuteacher@gmail.com",
//     subject: "Thử nghiệm send mail with node js aaaa",
//     html: template
// }