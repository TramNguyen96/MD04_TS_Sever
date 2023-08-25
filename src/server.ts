import dotenv from 'dotenv'
dotenv.config();

import express from "express"

/* Create server */
const server = express();

/* Setup api config */
import apiConfig from './apis'
server.use('/apis', apiConfig)

server.use("/test", (req, res) => {
    return res.send("Ok !!!")
})

/* Get server in port */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    
})