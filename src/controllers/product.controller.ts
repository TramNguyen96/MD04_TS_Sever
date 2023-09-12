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

        if (req.files) {
        let productPictures = [];

        // Iterate through all files
        for (let i = 0; i < (req.files.length as any); i++) {

            let path = await uploadFileToStorage((req.files as any)[i], "md04_products", fs.readFileSync((req.files as any)[i].path));
            fs.unlink((req.files as any)[i].path, (err) => {
                if (err) {
                    console.error("Error deleting file: ", err);
                }
            });

            productPictures.push({
                path
            });
        }

        newProduct.avatar = productPictures[0].path;
        //  if(req.files) {
        //     let avatarUrl = await uploadFileToStorage((req.files as any)[0], "md04_products", fs.readFileSync((req.files as any)[0].path))
        //     fs.unlink((req.files as any)[0].path, (err) => {

        //     })
        //     newProduct.avatar = avatarUrl
        // }

        //  let productPictures = [];
        // for (let i = 1; Number(i) < Number(req.files?.length); i++) {
        //     console.log("(req.files as any)[i]",(req.files as any)[i])
        //     let path = await uploadFileToStorage((req.files as any)[i], "md04_products", fs.readFileSync((req.files as any)[i].path))
        //     fs.unlink((req.files as any)[i].path, (err) => {
                
        //     })
        //     productPictures.push({
        //         path
        //     })
        // }
        
        try {
           let modelRes = await productModel.create(newProduct,productPictures );
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
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
            console.log("controller thu  err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },

    search: async function(req: Request, res: Response) {
        try {
            /* Find name */
            if(req.query.search){
                let modelRes = await productModel.search(String(req.query.search));
                return res.status(modelRes.status ? 200 : 213).json(modelRes);
            }
            /* Find all */
            let modelRes = await productModel.findMany();
           return res.status(modelRes.status ? 200 : 213).json(modelRes);
           
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },

    /* phan trang */
    pagination: async function (req: Request, res: Response) {
        try {
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await productModel.pagination(maxItemPage, skipItem)

            return res.status(modelRes.status ? 200 : 221).json(modelRes)
        } catch (err) {

            return res.status(500).json({
                message: "Lỗi không xác định findMany!"
            })
        }
    },
}