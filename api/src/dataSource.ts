import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { Comment } from "./models/Comment";
import env from "./environment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: env.DB_USERNAME,
    password: env.DB_PASS,
    database: env.DB_CONN,
    entities: [User, Post, Comment],
    synchronize: true,
    logging: false,
});