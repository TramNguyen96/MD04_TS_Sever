import jwt from 'jsonwebtoken';

export default {
    createToken: function (data:any, time: string) {
        // time(ms)
        try {
            return jwt.sign(
                data
                , String(process.env.JWT_KEY)
                , { expiresIn: `${time}` });
        } catch (err) {
            return false
        }
    },
    verifyToken: function(token: string) {
        let result;
        try{
            jwt.verify(token,String(process.env.JWT_KEY), function(err, decoded) {
            if(err) {
                result = false
            }else {
                result = decoded
            }
        });
        return result

        }catch(er){
            return false
        }
        
    }
}