
import { Router } from "express";
import { teste ,ativacaoCartao, cartaoVisualizacao,cartaoBloqueiar,cartaoDesBloqueiar,recargas, compras} from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema"
import cardSchema from "../schemas/schemaCard"
const authRouter = Router();

authRouter.post('/teste', teste);
authRouter.put('/ativacaoCartao', ativacaoCartao);
authRouter.get('/cartaoVisualizacao', cartaoVisualizacao);
authRouter.put('/cartaoBloqueiar', cartaoBloqueiar);
authRouter.put('/cartaoDesBloqueiar', cartaoDesBloqueiar);
authRouter.post('/recargas', recargas);
authRouter.post('/compras', compras) 
export default authRouter;