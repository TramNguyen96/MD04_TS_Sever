import dotenv from 'dotenv'
dotenv.config();


/* Create server */
import express from "express"
const server = express();

/* Config Cors */
import cors from 'cors'
server.use(cors())

/* Setup Body parser */
import bodyParser from 'body-parser';
server.use(bodyParser.json())

/* Prisma Client */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { Request, Response } from 'express';

server.use("/test", async (req: Request, res: Response)=>{
    let newUser = await  prisma.users.create({
            data: {
                userName: "admin",
                password: "123",
                avatar:  "abc.png",
                email: "1@2",
                isActive: true,
                address: [
                    {
                        provinceId: 1,
                        provinceName: "Tỉnh 1",
                        districtId: 2,
                        districtName: "Quân 2",
                        wardCode: "123",
                        wardName: "Xã 123",
                        title: "Nhà Riêng",
                        id: String(Date.now() * Math.random())
                    },
                    {
                        provinceId: 1,
                        provinceName: "Tỉnh 1",
                        districtId: 2,
                        districtName: "Quân 2",
                        wardCode: "123",
                        wardName: "Xã 123",
                        title: "Công Ty",
                        id: String(Date.now() * Math.random())
                    }
                ]
            }
    })

    let allUsers = await prisma.users.findMany();

    console.log("newUser", newUser);
    // console.log("allUsers", allUsers);
    
})


import axios from 'axios';
server.use("/authen-google", async (req, res) => {
    let result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FB_API_KEY}`, {
        idToken: req.body.token
    })

    console.log("result", result);
    res.json(result.data)
    
})

/* Setup api config */
// import apiConfig from './apis'
// server.use('/apis', apiConfig)

/* Get server in port */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    
})