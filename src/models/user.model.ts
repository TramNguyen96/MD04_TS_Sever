import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type Address = {
    provinceId:    number,
    provinceName: string,
    districtId:   number,
    districtName: string,
    wardCode:     string,
    wardName:    string,
    title:        string,
    id:          string
}

 export interface NewUser{
    email: string,
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar?: string,
    createAt?: Date,
    updateAt?: Date,
    address?: Address[]
}

 export interface UpdateUser{
    email?: string,
    emailConfirm?: boolean,
    userName?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    avatar?: string,
    isActive?: boolean,
    createAt?: Date,
    updateAt?: Date,
    address?: Address[],
    
}

interface PrismaErr {
    code?: string,
    meta?: {
        target: string
    },
    clientVersion?: string
}

export default {
    register: async function(newUser: NewUser){
        try{
            let user = await prisma.users.create({
                data: newUser
            })
            return {
                status: true,
                data: user,
                message: "registerSuccess"
            }

        }catch(err){
            console.log("err", err);
            
            let message: string = "modelErr";

            switch(( err as PrismaErr).meta?.target){
                case "users_userName_key":
                    message = "userNameDuplicate"
                    break

                case "users_email_key":
                     message = "emailDuplicate"
                     break

                default:
            }
            return {
                status: false,
                data: null,
                message
                
            }
        }
    },

    update: async function(userId: string, data: UpdateUser){
        try{
            let user = await prisma.users.update({
                where: {
                    id: userId
                },
                data
            })

            return {
                status: true,
                data: user,
                message: "Update success"
            }

        }catch(err){
            console.log("err", err);
            
            let message: string = "modelErr";

            switch(( err as PrismaErr).meta?.target){
                case "users_userName_key":
                    message = "userNameDuplicate"
                    break

                case "users_email_key":
                     message = "emailDuplicate"
                     break

                default:
            }
            return {
                status: false,
                data: null,
                message
                
            }
        }
    },

    infoByUserName: async function(userName: string){
        try{
            let user = await prisma.users.findUnique({
                where: {
                    userName
                },
            })

            return {
                status: true,
                data: user,
                message: "Get info success"
            }

        }catch(err){
            console.log("err", err);
            
            let message: string = "modelErr";

            return {
                status: false,
                data: null,
                message
                
            }
        }
    },

    infoById: async function(userId: string){
        try{
            let user = await prisma.users.findUnique({
                where: {
                    id: userId
                },
            })

            return {
                status: true,
                data: user,
                message: "Get info success"
            }

        }catch(err){
            console.log("err", err);
            
            let message: string = "modelErr";

            return {
                status: false,
                data: null,
                message
                
            }
        }
    },

    findMany: async function(){
        try{
            let users = await prisma.users.findMany()
            return {
                status: true,
                data: users,
                message: "Get info success"
            }

        }catch(err){
            console.log("err", err);
            
            let message: string = "modelErr";

            return {
                status: false,
                data: null,
                message
                
            }
        }
    },

}