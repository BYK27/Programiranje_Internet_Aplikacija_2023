import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/login').post(
    (req, res)=>new KorisnikController().login(req, res)
)

korisnikRouter.route('/register').post(
    (req, res)=>new KorisnikController().register(req, res)
)
korisnikRouter.route('/registerLekar').post(
    (req, res)=>new KorisnikController().registerLekar(req, res)
)

korisnikRouter.route('/getKorisnikByKorIme').post(
    (req, res)=>new KorisnikController().getKorisnikByKorIme(req, res)
)


korisnikRouter.route('/getKorisnikByKorMail').post(
    (req, res)=>new KorisnikController().getKorisnikByKorMail(req, res)
)

korisnikRouter.route('/getAllLekari').get(
    (req, res)=>new KorisnikController().getAllLekari(req, res)
)

korisnikRouter.route('/getAllPacijenti').get(
    (req, res)=>new KorisnikController().getAllPacijenti(req, res)
)

korisnikRouter.route('/getKorisnikByNeregistrovan').get(
    (req, res)=>new KorisnikController().getKorisnikByNeregistrovan(req, res)
)


//UPDATES
korisnikRouter.route('/updateLozinkaByKorIme').post(
    (req, res)=>new KorisnikController().updateLozinkaByKorIme(req, res)
)
korisnikRouter.route('/updateImeByKorIme').post(
    (req, res)=>new KorisnikController().updateImeByKorIme(req, res)
)
korisnikRouter.route('/updateKorImeByKorIme').post(
    (req, res)=>new KorisnikController().updateKorImeByKorIme(req, res)
)
korisnikRouter.route('/updatePrezimeByKorIme').post(
    (req, res)=>new KorisnikController().updatePrezimeByKorIme(req, res)
)
korisnikRouter.route('/updateAdresuByKorIme').post(
    (req, res)=>new KorisnikController().updateAdresuByKorIme(req, res)
)
korisnikRouter.route('/updateTelefonByKorIme').post(
    (req, res)=>new KorisnikController().updateTelefonByKorIme(req, res)
)
korisnikRouter.route('/updateSlikaByKorIme').post(
    (req, res)=>new KorisnikController().updateSlikaByKorIme(req, res)
)
korisnikRouter.route('/updateLicencaByKorIme').post(
    (req, res)=>new KorisnikController().updateLicencaByKorIme(req, res)
)
korisnikRouter.route('/updateSpecijalizacijaByKorIme').post(
    (req, res)=>new KorisnikController().updateSpecijalizacijaByKorIme(req, res)
)
korisnikRouter.route('/updateOrdinacijaByKorIme').post(
    (req, res)=>new KorisnikController().updateOrdinacijaByKorIme(req, res)
)
korisnikRouter.route('/updateStatusByKorIme').post(
    (req, res)=>new KorisnikController().updateStatusByKorIme(req, res)
)
korisnikRouter.route('/updateGodisnjiByKorIme').post(
    (req, res)=>new KorisnikController().updateGodisnjiByKorIme(req, res)
)

korisnikRouter.route('/insertSlobodanDanByKorIme').post(
    (req, res)=>new KorisnikController().insertSlobodanDanByKorIme(req, res)
)

korisnikRouter.route('/deleteByKorIme').post(
    (req, res)=>new KorisnikController().deleteByKorIme(req, res)
)

//LEKAR search with one parameter
korisnikRouter.route('/getLekariByIme').post(
    (req, res)=>new KorisnikController().getLekariByIme(req, res)
)
korisnikRouter.route('/getLekariByPrezime').post(
    (req, res)=>new KorisnikController().getLekariByPrezime(req, res)
)
korisnikRouter.route('/getLekariBySpecijalizacija').post(
    (req, res)=>new KorisnikController().getLekariBySpecijalizacija(req, res)
)


//LEKAR search with two parameters
korisnikRouter.route('/getLekariByImePrezime').post(
    (req, res)=>new KorisnikController().getLekariByImePrezime(req, res)
)
korisnikRouter.route('/getLekariByPrezimeSpecijalizacija').post(
    (req, res)=>new KorisnikController().getLekariByPrezimeSpecijalizacija(req, res)
)
korisnikRouter.route('/getLekariByImeSpecijalizacija').post(
    (req, res)=>new KorisnikController().getLekariByImeSpecijalizacija(req, res)
)


//LEKAR search with three parameters
korisnikRouter.route('/getLekariByImePrezimeSpecijalizacija').post(
    (req, res)=>new KorisnikController().getLekariByImePrezimeSpecijalizacija(req, res)
)

export default korisnikRouter;