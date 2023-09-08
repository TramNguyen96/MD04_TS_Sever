import productModel from "../models/product.model";
import { Request, Response } from "express";
import {uploadFileToStorage} from '../firebase'
import fs from 'fs'

export default {
    create: async function(req: Request, res: Response) {
        console.log("req", req.body)
        console.log("files", req.files)

        let data = JSON.parse(req.body.product);
        data.price = Number(data.price)
        let newProduct = {
           ... data,
            avatar: "abc.jpg"
        }
        
         if(req.files) {
            let avatarUrl = await uploadFileToStorage((req.files as any)[0], "md04_products", fs.readFileSync((req.files as any)[0].path))
            fs.unlink((req.files as any)[0].path, (err) => {

            })
            newProduct.avatar = avatarUrl
        }

         let productPictures = [];
        for (let i = 1; Number(i) < Number(req.files?.length); i++) {
            console.log("(req.files as any)[i]",(req.files as any)[i])
            let path = await uploadFileToStorage((req.files as any)[i], "md04_products", fs.readFileSync((req.files as any)[i].path))
            fs.unlink((req.files as any)[i].path, (err) => {
                
            })
            productPictures.push({
                path
            })
        }
        
        try {
           let modelRes = await productModel.create(newProduct,productPictures );
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },

    findMany: async function(req: Request, res: Response) {
        try {
           let modelRes = await productModel.findMany();
           return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },

    findById: async function(req: Request, res: Response) {
        try {
           let modelRes = await productModel.findById(String(req.params.productId));
           return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
}