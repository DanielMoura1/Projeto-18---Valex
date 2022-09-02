
import { Router } from "express";
import { teste } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema"
import cardSchema from "../schemas/schemaCard"
const authRouter = Router();

authRouter.post('/teste', teste);


export default authRouter;