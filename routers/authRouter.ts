
import { Router } from "express";
import { teste } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get('/teste', teste);


export default authRouter;