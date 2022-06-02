import express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './dataSource';
import env from './environment';
import cors from 'cors';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import commentRoutes from './routes/comment';
import { User } from './models/User';
import { Post } from './models/Post';

const app = express();

const port = env.PORT || 3000;

const main = async () => {
    try {
        
        await AppDataSource.initialize();

        app.use(cors({
            origin: 'http://localhost:8080',
            methods: '*'
        }));

        app.use(express.json());

        app.use('/api/user', userRoutes);
        app.use('/api/post', postRoutes);
        app.use('/api/comment', commentRoutes);

        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });

    } catch(err) {
        console.log(err);
    }
}

main();