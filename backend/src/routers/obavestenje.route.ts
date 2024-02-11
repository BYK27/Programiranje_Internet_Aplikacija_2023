import express from 'express'
import { ObavestenjeController } from '../controllers/obavestenje.controller';

const obavestenjeRouter = express.Router();

obavestenjeRouter.route('/getAllObavestenja').get(
    (req, res)=>new ObavestenjeController().getAllObavestenja(req, res)
)

obavestenjeRouter.route('/getObavestenjaByPacijent').post(
    (req, res)=>new ObavestenjeController().getObavestenjaByPacijent(req, res)
)

obavestenjeRouter.route('/updateObavestenjeStatusById').post(
    (req, res)=>new ObavestenjeController().updateObavestenjeStatusById(req, res)
)

obavestenjeRouter.route('/obavestiSvePacijente').post(
    (req, res)=>new ObavestenjeController().obavestiSvePacijente(req, res)
)

export default obavestenjeRouter;