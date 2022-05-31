import { RequestHandler } from "express";
import { AppDataSource } from "../dataSource";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { postDetails, userDetails } from "../utils";


export const getAllComments: RequestHandler = async (req, res) => {

    try {
        const { userId, postId } = req.query;

        let allComments = await AppDataSource
            .getRepository(Comment)
            .find({
                select: {
                    user: userDetails,
                    post: postDetails
                },
                relations: {
                    user: true,
                    post: true
                }
            });
        if (userId) {
            allComments = allComments.filter(comment => comment.user.id === parseInt(<string>userId));
        }
        if (postId) {
            allComments = allComments.filter(comment => comment.post.id === parseInt(<string>postId));
        }

        res.status(200).json({
            status: 'success',
            data: {
                allComments
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
}

export const createComment: RequestHandler = async (req, res) => {

    try {
        const token: any = req.token;
        const userId = token.user.id;
        const { postId, content }= req.body;
    
        const comment = new Comment();
        comment.content = content;
    
        await AppDataSource.manager.save(comment);
    
        const userRepo = AppDataSource.manager.getRepository(User);
        const postRepo = AppDataSource.manager.getRepository(Post);
    
        const user = await userRepo.findOne({
            where: {
                id: userId
            },
            relations: {
                comments: true
            }
        });
    
        const post = await postRepo.findOne({
            where: {
                id: postId
            },
            relations: {
                comments: true
            }
        });
    
        user.comments.push(comment);
        post.comments.push(comment);
    
        await userRepo.save(user);
        await postRepo.save(post);
    
        res.sendStatus(201);

    } catch (err) {
        res.sendStatus(500);
    }

}