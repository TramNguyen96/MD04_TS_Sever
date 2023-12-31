import categoryModel from "../models/category.model";
import { Request, Response } from 'express';


export default {
    createCategory: async function (req: Request, res:Response ){
        try{
            let modelRes = await categoryModel.createCategory(req.body);
            return res.status(modelRes.status ? 200 : 213 ).json(modelRes);

        }catch(err){
            return res.status(500).json({
                message:"Controller Error"
            })
        }
    },

    findMany: async function (req: Request, res:Response ){
        try{
            let modelRes = await categoryModel.findMany()
            console.log("modelRes thu ", modelRes)
            return res.status(modelRes.status ? 200 : 213 ).json(modelRes);

        }catch(err){
            return res.status(500).json({
                message:"Controller Error"
            })
        }
    },

    findCategoryIdRelation: async function (req: Request, res:Response) { 
        try {
            let result = await categoryModel.findCategoryIdRelation(req.params.id);

            return res.status(result.status ? 200 : 213).json(result)

        } catch (err) {
            return res.status(500).json({
                message: "Controller Error"
            })
        }
    },

}