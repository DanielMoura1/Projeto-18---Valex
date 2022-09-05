
import { Router } from "express";
import { cardCreate ,ativacaoCartao, cartaoVisualizacao,cartaoBloquear,cartaoDesBloquear,recargas, compras} from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema"
import cardSchema from "../schemas/schemaCard"
const authRouter = Router();

authRouter.post('/cardCreate',cardCreate);
authRouter.put('/ativacaoCartao', ativacaoCartao);
authRouter.get('/cartaoVisualizacao', cartaoVisualizacao);
authRouter.put('/cartaoBloquear', cartaoBloquear);
authRouter.put('/cartaoDesBloquear', cartaoDesBloquear);
authRouter.post('/recargas', recargas);
authRouter.post('/compras', compras) 
export default authRouter;