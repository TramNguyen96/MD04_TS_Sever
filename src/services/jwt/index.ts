import jwt from 'jsonwebtoken';

export default {
    // createToken: async function  (data: any, time: any) {
    //     // time(ms)
    //     try {
    //         const decoded = await jwt.verify(data, env.JWT_KEY, { expiresIn: `${time}` });
    //         return decoded
    //     } catch (err) {
    //         return false
    //     }
    // },
    // verifyToken: function (token: any) {
    //     let result;
    //     jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    //         if (err) {
    //             result = false
    //         } else {
    //             result = decoded
    //         }
    //     });
    //     return result
    // }
}