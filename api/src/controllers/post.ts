import { RequestHandler } from "express";
import { Response } from 'express';
import { AppDataSource } from "../dataSource";
import { Post } from "../models/Post";
import { User } from "../models/User";

import { userDetails } from "../utils";

export const getAllPosts: RequestHandler = async (req, res) => {
    try {
        const allPosts = await AppDataSource
            .getRepository(Post)
            .find({
                select: {
                    user: userDetails,
                },
                relations: {
                    user: true
                }
            });

        res.status(200).json({
            status: 'success',
            data: {
                allPosts
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message
        });
    }
}

export const getPost: RequestHandler = async (req, res) => {
    try {
        const { id: postId } = req.params;

        const post = await AppDataSource
            .getRepository(Post)
            .findOne({
                select: {
                    user: userDetails
                },
                where: {
                    id: parseInt(postId)
                },
                relations: {
                    user: true,
                    comments: {
                        user: true
                    }
                }
            });

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message
        });
    }
}


export const createPost: RequestHandler = async (req, res) => {
    const token: any = req.token;

    const post = new Post();
    post.title = req.body.title;
    post.body = req.body.body;
    await AppDataSource.manager.save(post);

    const userRepo = AppDataSource.manager.getRepository(User);

    const user = await userRepo.findOne({
        where: {
             id: token.user.id
        },
        relations: {
            posts: true
        }
    });

    user.posts.push(post);

    await userRepo.save(user);

    res.status(201).json({
        status: 'success',
    });
}
