import { Router } from "express";
import { getAllPosts, createPost, getPost } from "../controllers/post";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router
.get('/',verifyToken, getAllPosts)
.get('/:id',verifyToken, getPost);

router
.post('/',verifyToken, createPost)

export default router;