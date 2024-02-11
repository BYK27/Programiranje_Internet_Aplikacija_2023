"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
korisnikRouter.route('/register').post((req, res) => new korisnik_controller_1.KorisnikController().register(req, res));
korisnikRouter.route('/registerLekar').post((req, res) => new korisnik_controller_1.KorisnikController().registerLekar(req, res));
korisnikRouter.route('/getKorisnikByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().getKorisnikByKorIme(req, res));
korisnikRouter.route('/getKorisnikByKorMail').post((req, res) => new korisnik_controller_1.KorisnikController().getKorisnikByKorMail(req, res));
korisnikRouter.route('/getAllLekari').get((req, res) => new korisnik_controller_1.KorisnikController().getAllLekari(req, res));
korisnikRouter.route('/getAllPacijenti').get((req, res) => new korisnik_controller_1.KorisnikController().getAllPacijenti(req, res));
korisnikRouter.route('/getKorisnikByNeregistrovan').get((req, res) => new korisnik_controller_1.KorisnikController().getKorisnikByNeregistrovan(req, res));
//UPDATES
korisnikRouter.route('/updateLozinkaByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateLozinkaByKorIme(req, res));
korisnikRouter.route('/updateImeByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateImeByKorIme(req, res));
korisnikRouter.route('/updateKorImeByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateKorImeByKorIme(req, res));
korisnikRouter.route('/updatePrezimeByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updatePrezimeByKorIme(req, res));
korisnikRouter.route('/updateAdresuByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateAdresuByKorIme(req, res));
korisnikRouter.route('/updateTelefonByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateTelefonByKorIme(req, res));
korisnikRouter.route('/updateSlikaByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateSlikaByKorIme(req, res));
korisnikRouter.route('/updateLicencaByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateLicencaByKorIme(req, res));
korisnikRouter.route('/updateSpecijalizacijaByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateSpecijalizacijaByKorIme(req, res));
korisnikRouter.route('/updateOrdinacijaByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateOrdinacijaByKorIme(req, res));
korisnikRouter.route('/updateStatusByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateStatusByKorIme(req, res));
korisnikRouter.route('/updateGodisnjiByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().updateGodisnjiByKorIme(req, res));
korisnikRouter.route('/insertSlobodanDanByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().insertSlobodanDanByKorIme(req, res));
korisnikRouter.route('/deleteByKorIme').post((req, res) => new korisnik_controller_1.KorisnikController().deleteByKorIme(req, res));
//LEKAR search with one parameter
korisnikRouter.route('/getLekariByIme').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByIme(req, res));
korisnikRouter.route('/getLekariByPrezime').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByPrezime(req, res));
korisnikRouter.route('/getLekariBySpecijalizacija').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariBySpecijalizacija(req, res));
//LEKAR search with two parameters
korisnikRouter.route('/getLekariByImePrezime').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByImePrezime(req, res));
korisnikRouter.route('/getLekariByPrezimeSpecijalizacija').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByPrezimeSpecijalizacija(req, res));
korisnikRouter.route('/getLekariByImeSpecijalizacija').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByImeSpecijalizacija(req, res));
//LEKAR search with three parameters
korisnikRouter.route('/getLekariByImePrezimeSpecijalizacija').post((req, res) => new korisnik_controller_1.KorisnikController().getLekariByImePrezimeSpecijalizacija(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.route.js.map