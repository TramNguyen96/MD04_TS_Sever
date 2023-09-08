import { Request, Response, NextFunction } from 'express';


function isEmail (email: string): boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

export default {
    validateRegister: function (req: Request, res: Response, next: NextFunction){
        
        const { userName, email, password, confirmPassword, firstName, lastName } = req.body;
        console.log("req.body", req.body);

        if(req.body.userName == null || req.body.email  == null|| req.body.password == null || req.body.firstName == null || req.body.lastName == null){
            return res.status(213).json(
                {
                    status: false,
                    message: "All fields are required !"
                }
            )
        }
        
        if(!isEmail(email)){
            return res.status(213).json(
                {
                    status: false,
                    message: "Invalid email address !"
                }
            )
        }

        //  if (password !== confirmPassword) {
        //     return res.status(213).json(
        //         {
        //             status: false,
        //             message: "Incorrect password !"
        //         }
        //     )
        // }
        
        next();
    }
}