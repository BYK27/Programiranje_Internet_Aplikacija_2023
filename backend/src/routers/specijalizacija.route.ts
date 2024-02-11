import express from 'express'
import { SpecijalizacijaController } from '../controllers/specijalizacija.controller';

const specijalizacijaRouter = express.Router();

specijalizacijaRouter.route('/getAllSpecijalizacija').get(
    (req, res)=>new SpecijalizacijaController().getAllSpecijalizacija(req, res)
)

specijalizacijaRouter.route('/insertSpecijalizacija').post(
    (req, res)=>new SpecijalizacijaController().insertSpecijalizacija(req, res)
)

export default specijalizacijaRouter;