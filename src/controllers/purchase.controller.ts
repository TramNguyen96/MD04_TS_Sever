import purchaseModel from "../models/purchase.model";
import { Request, Response } from "express";
import otps from "../services/otps";
import mail, {templates} from "../services/mail";

export default {
    createGuestReceipt: async function(req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Error controller"
            })
        }
    },

    findGuestReceipt: async function(req: Request, res: Response){
        // console.log("req.body", req.body.guestEmail);
        
        try{
            let modelRes = await purchaseModel.findGuestReceipt(String(req.body.guestEmail));
            if(req.body.otp){
                /* Have OTP */
                let result = otps.checkOtp(String(req.body.guestEmail), String(req.body.otp))
                if(result){
                    return res.status(modelRes.status ? 200 : 213).json(modelRes)
                }
                return res.status(213).json(
                    {
                        message: "OTP Code Invalid!"
                    }
                )
            }else{
                // console.log("Chua co otp");
                /* Not OTP yet */
                if(modelRes.status && modelRes.data != null){
                    if(modelRes.data?.length > 0){
                        let otpObj = otps.createOtp(String(req.body.guestEmail), 5)
                        // console.log("otpObj", otpObj);
                        
                        if(otpObj){
                           /* Send mail to guest */
                            let mailSent = await mail.sendMail({
                                subject: "Send OTP code for confirmation",
                                to: `${String(req.body.guestEmail)}`,
                                html: templates.emailOtp(otpObj?.otp, new Date(otpObj?.createAt))
                            })
                            return res.status(mailSent ? 200 : 213).json(
                                {
                                    message: `${mailSent ? "OTP sent to email" : "Service sent mail error"}`
                                }
                            )

                        }else{
                            return res.status(213).json(
                                {
                                    message: "You have no transactions yet!"
                                }
                            )
                        }
                    }
                    
                }
                return res.status(213).json(
                    {
                        message: "OTP Code Invalid!"
                    }
                )
                
            }

        }catch(err){
            return res.status(500).json({
                message: "Controller Error"
            })
        }
    },

    findAllGuestReceipt: async function(req: Request, res: Response){
        try{
            let modelRes = await purchaseModel.findAllGuestReceipt();
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
                
        }catch(err){
            return res.status(500).json({
                message: "Controller Error"
            })
        }
    }
}