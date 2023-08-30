// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// const users = [
//   { id: 1, name: 'User 1' },
//   { id: 2, name: 'User 2' },
// ];

// export default  {
//   create: async function (newUser: any) {
//         try {
//             await prisma.users.create({
//                 data: newUser
//             })

//             return {
//                 status: true,
//                 message: "Register successfully!",
//             }
//         } catch (err) {
//           console.log("err", err);
          
//             return {
//                 status: false,
//                 message: "registration failed!"
//             }
//         }
//     },

//   login: async (loginData: any) => {
//         try {
//             let user = await prisma.users.findUnique({
//                 // 1: user_name, 0: email
//                 where: loginData.type ? { user_name: loginData.user_name } : { email: loginData.user_name, email_confirm: true }
//             })
//             if (!user) {
//                 return {
//                     status: false,
//                     message: "User not found!",
//                 }
//             }
//             return {
//                 status: true,
//                 message: "User information!",
//                 data: user
//             }
//         } catch (err) {
//             return {
//                 status: false,
//                 message: "User information!"
//             }
//         }
//     },

//   findAll: async () => {
//         try {
//             let users = await prisma.users.findMany()

//             return {
//                 status: true,
//                 message: "Get all users successful!",
//                 data: users
//             }


//         } catch (err) {
//             return {
//                 status: false,
//                 message: "Something wrong!"
//             }
//         }
//     }

// };
