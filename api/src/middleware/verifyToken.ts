import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "../environment";

const verifyToken: RequestHandler = (req, res, next) => {
    const bearerheader = req.headers['authorization'];
    if (!bearerheader) return res.sendStatus(403);

    const token = bearerheader.split(' ')[1];

    jwt.verify(token, env.JWT_SECRET, (err, token) => {
        if (err) return res.sendStatus(403);
        req.token = token;
        next();
    });
}

export default verifyToken;