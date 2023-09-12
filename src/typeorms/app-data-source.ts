import { DataSource } from "typeorm"
import path from 'path'

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_ID,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${path.join(__dirname, "entities/*.ts")}`],
    logging: false,
    synchronize: true,
})