import express from 'express'
import { IzvestajController } from '../controllers/izvestaj.controller';

const izvestajRouter = express.Router();

izvestajRouter.route('/getIzvestajByPacijent').post(
    (req, res)=>new IzvestajController().getIzvestajByPacijent(req, res)
)

izvestajRouter.route('/insertIzvestaj').post(
    (req, res)=>new IzvestajController().insertIzvestaj(req, res)
)

izvestajRouter.route('/getIzvestajByDatumVremeLekarPacijent').post(
    (req, res)=>new IzvestajController().getIzvestajByDatumVremeLekarPacijent(req, res)
)

export default izvestajRouter;