import { Router } from "express";
import { getAllComments, createComment } from "../controllers/comment";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router
.get('/',verifyToken, getAllComments)
// .get('/:id',verifyToken, getPost);

router
.post('/',verifyToken, createComment)

export default router;