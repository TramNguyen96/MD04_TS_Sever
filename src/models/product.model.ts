import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function(newProduct: any, productPictures: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    productPictures: {
                        createMany: {
                            data: [
                                ...productPictures
                            ]
                        }
                    }
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Create product ok!",
                data: product
            }
        }catch(err) {
            console.log("err", err);
            
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },

    findMany: async function() {
        try {
            let products = await prisma.products.findMany({
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Get products ok!",
                data: products
            }
        }catch(err) {
            console.log("lỗi", err)
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },

     findById: async function(productId: string) {
        try {
            let product = await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include: {
                    productPictures: true,
                }
            });

            return {
                status: true,
                message: "Get product detail ok!",
                data: product
            }
        }catch(err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },

    search: async function(searchKey: string) {
        try {
            let products = await prisma.products.findMany(
                {
                    where: {
                        name: {
                            contains: searchKey,
                            // mode: 'insensitive'
                        }
                    }
                }
            );

            return {
                status: true,
                message: "Search success!",
                data: products
            }
        }catch(err) {
            console.log("lỗi", err)
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },

    /* phan trang */
    pagination: async function (maxItemPage: number, skipItem: any) {
        try {
            let products = await prisma.products.findMany({
                take: maxItemPage,
                skip: skipItem,
            });
            let countItem = (await prisma.products.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "san pham duoc tim thay!",
                maxPage,
                data: products,
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "lỗi model!"
            }
        }
    },

}

