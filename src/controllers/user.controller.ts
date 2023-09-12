import userModel, {NewUser, Address} from '../models/user.model';
import { Request, Response } from 'express';
import Text from '../text'
import mail, {templates} from '../services/mail';
import jwt from '../services/jwt';
import bcrypt from 'bcrypt'


export default {
  register: async (req: Request, res: Response) => {
    try{
        /* Hash password */
        req.body.password = await bcrypt.hash(req.body.password, 10);
    
        let newUser: NewUser = {
            ...req.body,
            createAt: new Date(Date.now()*Math.random()),
            updateAt: new Date(Date.now()*Math.random()),
        }
        let modelRes = await userModel.register(newUser)

        modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message]

        /* Mail */
        if(modelRes.status){
            mail.sendMail({
                to: `${modelRes.data?.email}`,
                subject: "Email Verification",
                html: templates.emailConfirm({
                    confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt.createToken(modelRes.data, "300000")}`,
                    language: String(req.headers.language),
                    productName: "Catherine Deane",
                    productWebUrl:"https://www.catherinedeane.co.uk/",
                    receiverName: modelRes.data?.firstName + " " + modelRes.data?.lastName
                })
            })
        }

        return res.status(modelRes.status ? 200 : 213).json(modelRes);

    }catch(err){
        return res.status(500).json({
            message: Text(String(req.headers.language)).controllerErr
        })
    }
            

  },

  login: async (req: Request, res: Response) => {
        try{
            let modelRes = await userModel.infoByUserName(req.body.userName);
            if(modelRes.status) {
                if(!modelRes.data?.userName){
                    return res.status(213).json({
                        message: "UserName does not exist !"
                    })
                }

                if(!modelRes.data?.isActive){
                    return res.status(213).json({
                        message: "Account is temporarily locked !"
                    })
                }

                let checkPassword = await bcrypt.compare(req.body.password, modelRes.data.password);
                if(!checkPassword){
                    return res.status(213).json({
                        message: "Incorrect password !"
                    })
                }
                return res.status(200).json({
                        message: "Login successfully !",
                        token: jwt.createToken(modelRes.data, "1d")
                    })
                 
            }
            return res.status(modelRes.status ? 200 : 213).json({
                message: "User does not exist !"
            })
            
        }catch(err){
            return res.status(500).json({
                message: Text(String(req.headers.language)).controllerErr
            })
        }
                

    },

    findMany: async (req: Request, res: Response) => {
        try{
            let modelRes = await userModel.findMany();

            return res.status(modelRes.status ? 200 : 213).json(modelRes)
            
        }catch(err){
            return res.status(500).json({
                message: Text(String(req.headers.language)).controllerErr
            })
        }
    },
}