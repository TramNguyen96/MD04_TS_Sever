import { PrismaClient, ReceiptPayMode, ReceiptState } from '@prisma/client'
const prisma = new PrismaClient()

/* Guest */
interface NewGuestReceiptDetail {
    productId: string;
    quantity: number;
}
interface GuestReceiptDetail extends NewGuestReceiptDetail{
    id: string;
    guestReceiptId: string;
}
interface NewGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}
interface Products {
    name: string;
    avatar: string;
}
interface GuestReceipt extends NewGuestReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    guestReceiptDetail: GuestReceiptDetail[];
    products: Products[]
}



/* User */
interface NewUserReceiptDetail{
    productId: string;
    quantity: number;
}
interface UserReceiptDetail extends NewUserReceiptDetail{
    id: string;
    userReceiptId: string;
}
interface NewUserReceipt{
    userId :string ;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}
interface UserReceipt extends NewUserReceipt{
     id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    UserReceiptDetail: UserReceiptDetail[]
}

export default {
    createGuestReceipt: async function(newGuestReceipt:NewGuestReceipt, guestReceiptDetailList:NewGuestReceiptDetail  ){
        try{
            let receipt = await prisma.guestReceipts.create({
                data: {
                    ...newGuestReceipt,
                    guestReceiptDetail: {
                        createMany: {
                            data: guestReceiptDetailList
                        }
                    }
                },
                 include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Order guest succsess!",
                data: receipt
            }

        }catch(err){
            console.log("err", err);
            
            return {
                status: false,
                message: "Model error",
                data: null
            }
        }
    },

    findGuestReceipt: async function(guestEmail: string){
        try{
            let receipts = await prisma.guestReceipts.findMany({
               where: {
                    email: guestEmail
               },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }
                    }
                }
               
            })
            return {
                status: true,
                message: "Get list receipts order succsess!",
                data: receipts
            }

        }catch(err){
            return {
                status: false,
                message: "Model error",
                data: null
            }
        }
    },

    findAllGuestReceipt: async function(){
        try{
            let receipts = await prisma.guestReceipts.findMany()
            return {
                status: true,
                message: "Get all list receipts order succsess!",
                data: receipts
            }

        }catch(err){
            return {
                status: false,
                message: "Model error",
                data: null
            }
        }
    },
    

}