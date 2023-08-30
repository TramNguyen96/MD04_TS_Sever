// import userModel from '../models/user.model';
// import bcrypt from 'bcrypt';
// import ipService from '../services/ip';
// import mailService from '../services/mail';
// import jwt from '../services/jwt';

// // import { Request, Response } from 'express';

// async function sendMailLogin(user: any, ip: any) {
//     let result = await ipService.deIp(ip); // 5.181.233.162
//     /* Xử lý email */
//     try {
//         let mailSent = await mailService.sendMail({
//             to: user.email,
//             subject: "Thông báo về tài khoản",
//             html: `
//                 <h1 style="color: red">
//                     ${result.status == "fail"
//                     ?
//                     "Tài khoản đã login tại địa chỉ ip là: " + ip
//                     : "Tài khoản đã login tại: quốc gia: " + result.country + " với ip là: " + result.query
//                 }

//                 </h1>
//             `
//         });
//     } catch (err) {
//         //console.log("err", err)
//     }
// }

// export default {
//   create: async (req: any, res: any) => {
//      try {
//             req.body.password = await bcrypt.hash(req.body.password, 10);
//             let modelRes = await userModel.create(req.body)

//             // /* Xử lý email */
//             // try {
//             //     if (modelRes.status) {
//             //         let token = jwt.createToken({
//             //             user_name: req.body.user_name,
//             //             email: req.body.email
//             //         }, 300000)

//             //         if (!token) {
//             //             return res.status(200).json({
//             //                 message: "Đăng ký thành công, nhưng gửi mail thất bại!"
//             //             })
//             //         }
//             //         let template = await ejs.renderFile(
//             //             path.join(__dirname, "../templates/email_confirm.ejs"),
//             //             { user: req.body, token }
//             //         )

//             //         if (modelRes.status) {
//             //             let mailOptions = {
//             //                 to: req.body.email,
//             //                 subject: "Email Verification",
//             //                 html: template
//             //             }
//             //             let mailSent = await mailService.sendMail(mailOptions);
//             //             if (mailSent) {
//             //                 modelRes.message += " Verification email sent, please check!"
//             //             }
//             //         }
//             //     }
//             // } catch (err) {
//             //     modelRes.message += " Error in sending verification email, you can resend email in profile !"
//             // }

//             res.status(modelRes.status ? 200 : 413).json(modelRes)
//         } catch (err) {
//             return res.status(500).json(
//                 {
//                     message: "Lỗi xử lý!"
//                 }
//             )
//         }
    

//   },

//   login: async (req: any, res: any) => {
//         try {
//             let modelRes = await userModel.login(req.body)

//             if (modelRes.status) {
//                 // xác thực password
//                 let checkPassword = await bcrypt.compare(req.body.password, modelRes.data!.password)
//                 if (!checkPassword) {
//                     modelRes.message = "incorrect password !"
//                     return res.status(modelRes.status ? 200 : 213).json(modelRes)
//                 }
//                 // xác thực trạng thái tài khoản
//                 if (modelRes.data!.blocked) {
//                     modelRes.message = "Account has been locked !"
//                     return res.status(modelRes.status ? 200 : 213).json(modelRes)
//                 }
//                 // thành công xử lý token
//                 // let token = jwt.createToken(modelRes, "1d");

//                 // gửi mail thông báo về tình hình đăng nhập nếu đã xác nhận email.
//                 let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // địa chỉ ip nơi gửi request
//                 sendMailLogin(modelRes.data, ipAddress);

//                 // trả về client
//                 // return res.status(token ? 200 : 314).json(
//                 //     {
//                 //         message: token ? "Login successful!" : "Server maintenance!",
//                 //         token
//                 //     }
//                 // )
//             }
//             return res.status(modelRes.status ? 200 : 413).json(modelRes)
//         } catch (err) {
//             return res.status(500).json(
//                 {
//                     message: "Lỗi xử lý!"
//                 }
//             )
//         }
//     },

//   findAll: async function (req:any, res:any) {
//         try {
//             let result = await userModel.findAll()
//             if (result.status) {
//                 return res.status(200).json(
//                     {
//                         message: result.message,
//                         data: result.data
//                     }
//                 )
//             }
//             console.log("result", result);

//             return res.status(500).json(
//                 {
//                     message: result.message
//                 }
//             )


//         } catch (err) {
//             return res.status(500).json(
//                 {
//                     message: "Loi khong xac dinh !!!"
//                 }
//             )

//         }
//     },

// };