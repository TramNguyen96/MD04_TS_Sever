import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export interface NewCategory {
    title: string,
    avatar?: string,
    img: string,
    banner: string,
    des: string,
    link: string
}

export default {
    createCategory: async function(newCategory: NewCategory){
        try{
            let category = await prisma.categories.create({
                data: newCategory
            })
            return {
                status: true,
                data: category,
                message: "Create category success"
            }

        }catch(err){
            console.log("err", err);
            return {
                status: false,
                data: null,
                message: "Model error"
                
            }
        }
    },

    findMany: async function (){
        try{
            let categories = await prisma.categories.findMany();
            return {
                status: true,
                message: "Get categories success",
                data: categories
            }

        }catch(err){
            return {
                status: false,
                message: "Loi model",
                data: null
            }

        }
    },

    findCategoryIdRelation: async function (categoryId: string) {
        try {
            let data = await prisma.categories.findMany({
                where: {
                    id: categoryId
                },
                include: {
                    products: true
                }
            })
            return {
                status: true,
                message: 'Get categories of id success',
                data
            }
        } catch (err) {
            console.log("err", err);
            
            return {
                status: false,
                message: 'Loi model'
            }
        }
    }
}