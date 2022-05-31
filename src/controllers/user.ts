import { RequestHandler } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import verifyToken from "../middleware/verifyToken";
import env from '../environment';

const createUser = async (userData: User): Promise<User> => {
    try {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = await bcrypt.hash(userData.password, 10);
    
        return await AppDataSource.manager.save(user);
    } catch (err) {
        throw new Error('could not create user');
    }
}

export const registerUser: RequestHandler = async (req, res) => {
    try {
        const user = await createUser(req.body);
    
        res.status(201).json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message
        });
    }
}

export const loginUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .getOne();
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({
                status: 'fail',
                message: 'wrong credentials'
            });
        }

        jwt.sign({ user }, env.JWT_SECRET, (err, token) => {
            if (err) throw new Error('error while signing token');
            res.status(200).json({
                status: 'success',
                data: {
                    token
                }
            });
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message
        });
    }
}

export const logoutUser: RequestHandler = (req, res) => {
    res.json({
        msg: 'logging out...'
    });
}
