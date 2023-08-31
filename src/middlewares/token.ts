import { Request, Response, NextFunction } from "express";
import jwt from "../services/jwt";
import userModel from "../models/user.model";

export default {
    validateToken: async function(req: Request, res: Response, next: NextFunction){
        let token: string;
        token = req.params.token ? String(req.params.token) : String(req.headers.token);

        let tokenObj = jwt.verifyToken(token)
        if(tokenObj){
            let modelRes = await userModel.infoById((tokenObj as any).id);

            if(modelRes.status){
                if(new Date(modelRes.data?.updateAt!).toDateString() == new Date((tokenObj as any).updateAt).toDateString()) {
                    return next();
              }
            }

        }
        
        return res.status(213).json({
            message: "Token don't match"
        })

    }
}