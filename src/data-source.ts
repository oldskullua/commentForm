import * as dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"
import { Comment } from "./entity/Comment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST || "localhost",
    port: parseInt(process.env.TYPEORM_PORT) || 5432,
    username: process.env.TYPEORM_USER || "postgres",
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Product, Comment],
    migrations: [],
    subscribers: [],
})
