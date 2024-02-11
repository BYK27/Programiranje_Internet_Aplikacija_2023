import express from 'express'
import { PregledController } from '../controllers/pregled.controller';

const pregledRouter = express.Router();

pregledRouter.route('/getBazniPregledByLekar').post(
    (req, res)=>new PregledController().getBazniPregledByLekar(req, res)
)

pregledRouter.route('/getAllBazniPregled').get(
    (req, res)=>new PregledController().getAllBazniPregled(req, res)
)

pregledRouter.route('/getAllPendingPregled').get(
    (req, res)=>new PregledController().getAllPendingPregled(req, res)
)

pregledRouter.route('/getZakazaniPregledByLekar').post(
    (req, res)=>new PregledController().getZakazaniPregledByLekar(req, res)
)

pregledRouter.route('/getPregledByPacijent').post(
    (req, res)=>new PregledController().getPregledByPacijent(req, res)
)

pregledRouter.route('/getBazniPregledByNaziv').post(
    (req, res)=>new PregledController().getBazniPregledByNaziv(req, res)
)

pregledRouter.route('/getBazniPregledBySpecijalizacija').post(
    (req, res)=>new PregledController().getBazniPregledBySpecijalizacija(req, res)
)

pregledRouter.route('/getZakazanPregledNoIzvestaj').get(
    (req, res)=>new PregledController().getZakazanPregledNoIzvestaj(req, res)
)

pregledRouter.route('/getZakazanPregledNoIzvestajByNazivLekarPocetakDatum').post(
    (req, res)=>new PregledController().getZakazanPregledNoIzvestajByNazivLekarPocetakDatum(req, res)
)

pregledRouter.route('/insertPregled').post(
    (req, res)=>new PregledController().insertPregled(req, res)
)
pregledRouter.route('/insertPendingOrBazniPregled').post(
    (req, res)=>new PregledController().insertPendingOrBazniPregled(req, res)
)


pregledRouter.route('/updateNazivByNaziv').post(
    (req, res)=>new PregledController().updateNazivByNaziv(req, res)
)
pregledRouter.route('/updateTrajanjevByNaziv').post(
    (req, res)=>new PregledController().updateTrajanjevByNaziv(req, res)
)
pregledRouter.route('/updateCenaByNaziv').post(
    (req, res)=>new PregledController().updateCenaByNaziv(req, res)
)

pregledRouter.route('/updateSpecijalizacijaByNaziv').post(
    (req, res)=>new PregledController().updateSpecijalizacijaByNaziv(req, res)
)
pregledRouter.route('/updateStatusByNaziv').post(
    (req, res)=>new PregledController().updateStatusByNaziv(req, res)
)
pregledRouter.route('/updateCenaByupdateZakazanByNazivLekarPocetakDatumNaziv').post(
    (req, res)=>new PregledController().updateZakazanByNazivLekarPocetakDatum(req, res)
)

pregledRouter.route('/deletePregled').post(
    (req, res)=>new PregledController().deletePregled(req, res)
)

pregledRouter.route('/updateBazniLekarByNaziv').post(
    (req, res)=>new PregledController().updateBazniLekarByNaziv(req, res)
)

pregledRouter.route('/updateZakazanByNazivLekarPocetakDatum').post(
    (req, res)=>new PregledController().updateZakazanByNazivLekarPocetakDatum(req, res)
)

pregledRouter.route('/updateObavestenByNazivLekarPocetakDatum').post(
    (req, res)=>new PregledController().updateObavestenByNazivLekarPocetakDatum(req, res)
)

pregledRouter.route('/otkaziPregled').post(
    (req, res)=>new PregledController().otkaziPregled(req, res)
)


export default pregledRouter;