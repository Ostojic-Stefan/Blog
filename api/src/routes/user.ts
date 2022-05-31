import { Router } from "express";
import { registerUser, logoutUser, loginUser } from "../controllers/user";

const router = Router();

router
.post('/register', registerUser)
.post('/login', loginUser)
.post('/logout', logoutUser);

export default router;