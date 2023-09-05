import express, { Request, Response, NextFunction } from 'express';

export default {
    isEmail: function(email: string): boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateRegister: function (req: Request, res: Response, next: NextFunction){
        const { userName, email, password, confirmPassword, firstName, lastName } = req.body;

        if(!userName || !email || !password || !confirmPassword || !firstName || !lastName){
            return res.status(213).json(
                {
                    status: false,
                    message: "All fields are required !"
                }
            )
        }

        if(password !== confirmPassword){
            return res.status(213).json(
                {
                    status: false,
                    message: "Incorrect password !"
                }
            )
        }

        if(!this.isEmail(email)){
            return res.status(213).json(
                {
                    status: false,
                    message: "Invalid email address !"
                }
            )
        }

        next();
    }
}