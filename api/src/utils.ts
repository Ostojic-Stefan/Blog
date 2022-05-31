import { Express } from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        token?: string | JwtPayload;
    }
    interface Response {
        token?: string | JwtPayload;
    }
}

export const userDetails = {
    id: true,
    name: true,
    email: true,
}

export const postDetails = {
    id: true,
    title: true,
    body: true
}