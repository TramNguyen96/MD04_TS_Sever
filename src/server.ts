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

/* Setup api config */
import apiConfig from './apis'
import guard from './middlewares/guard';

server.use('/apis', guard.ipAuthen, apiConfig)

// /* Test */
// import { Request, Response } from 'express';
// import fs from 'fs'
// import path from 'path'
// function Test(){
//     let data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"));
//     console.log("data", data);
    
// }
// Test()

/* Get server in port */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    
})