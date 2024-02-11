"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            let status = "registrovan";
            korisnik_1.default.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new korisnik_1.default({
                kor_ime: req.body.kor_ime,
                lozinka: req.body.lozinka,
                ime: req.body.ime,
                prezime: req.body.prezime,
                adresa: req.body.adresa,
                telefon: req.body.telefon,
                mejl: req.body.mejl,
                tip: "pacijent",
                slika: req.body.slika,
                status: "neregistrovan"
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert ok" });
            });
        };
        this.registerLekar = (req, res) => {
            let user = new korisnik_1.default({
                kor_ime: req.body.kor_ime,
                lozinka: req.body.lozinka,
                ime: req.body.ime,
                prezime: req.body.prezime,
                adresa: req.body.adresa,
                telefon: req.body.telefon,
                mejl: req.body.mejl,
                tip: "lekar",
                licenca: req.body.licenca,
                specijalizacija: req.body.specijalizacija,
                ordinacija: req.body.ordinacija,
                slika: req.body.slika,
                status: "registrovan"
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert lekar ok" });
            });
        };
        //GETTERS
        this.getKorisnikByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getKorisnikByKorMail = (req, res) => {
            let mejl = req.body.mejl;
            korisnik_1.default.findOne({ 'mejl': mejl }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getKorisnikByNeregistrovan = (req, res) => {
            let tip = "pacijent";
            let status = "neregistrovan";
            korisnik_1.default.find({ 'tip': tip, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        //SETTERS
        this.updateLozinkaByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'lozinka': lozinka } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update lozinka ok' });
                }
            });
        };
        this.updateImeByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let ime = req.body.ime;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'ime': ime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update ime ok' });
                }
            });
        };
        this.updateKorImeByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'kor_ime': kor_ime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update ime ok' });
                }
            });
        };
        this.updatePrezimeByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let prezime = req.body.prezime;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'prezime': prezime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update prezime ok' });
                }
            });
        };
        this.updateAdresuByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let adresa = req.body.adresa;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'adresa': adresa } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update adresa ok' });
                }
            });
        };
        this.updateTelefonByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let telefon = req.body.telefon;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'telefon': telefon } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update telefon ok' });
                }
            });
        };
        this.updateSlikaByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let slika = req.body.slika;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'slika': slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update slika ok' });
                }
            });
        };
        this.updateLicencaByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let licenca = req.body.licenca;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'licenca': licenca } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update licenca ok' });
                }
            });
        };
        this.updateSpecijalizacijaByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let specijalizacija = req.body.specijalizacija;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'specijalizacija': specijalizacija } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update specijalizacija ok' });
                }
            });
        };
        this.updateOrdinacijaByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let ordinacija = req.body.ordinacija;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'ordinacija': ordinacija } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update ordinacija ok' });
                }
            });
        };
        this.updateStatusByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let status = req.body.status;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'status': status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update status ok' });
                }
            });
        };
        this.updateGodisnjiByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let godisnji_pocetak = req.body.godisnji_pocetak;
            let godisnji_kraj = req.body.godisnji_kraj;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'godisnji_pocetak': godisnji_pocetak, 'godisnji_kraj': godisnji_kraj } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update godisnji ok' });
                }
            });
        };
        this.insertSlobodanDanByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let slobodan_dan = req.body.slobodan_dan;
            korisnik_1.default.updateOne({ 'kor_ime': kor_ime }, { $push: { 'slobodan_dan': slobodan_dan } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update slobodniDan ok' });
                }
            });
        };
        this.deleteByKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.deleteOne({ 'kor_ime': kor_ime }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'delete korisnik ok' });
                }
            });
        };
        this.getAllLekari = (req, res) => {
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllPacijenti = (req, res) => {
            let tip = "pacijent";
            korisnik_1.default.find({ 'tip': tip }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        //LEKAR search with one parameter
        this.getLekariByIme = (req, res) => {
            let ime = req.body.ime;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'ime': ime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getLekariByPrezime = (req, res) => {
            let prezime = req.body.prezime;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'prezime': prezime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getLekariBySpecijalizacija = (req, res) => {
            let specijalizacija = req.body.specijalizacija;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'specijalizacija': specijalizacija }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        //LEKAR search with two parameters
        this.getLekariByImePrezime = (req, res) => {
            let prezime = req.body.prezime;
            let ime = req.body.ime;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'ime': ime, 'prezime': prezime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getLekariByImeSpecijalizacija = (req, res) => {
            let specijalizacija = req.body.specijalizacija;
            let ime = req.body.ime;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'ime': ime, 'specijalizacija': specijalizacija }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getLekariByPrezimeSpecijalizacija = (req, res) => {
            let prezime = req.body.prezime;
            let specijalizacija = req.body.specijalizacija;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'specijalizacija': specijalizacija, 'prezime': prezime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        //LEKAR search with three parameters
        this.getLekariByImePrezimeSpecijalizacija = (req, res) => {
            let prezime = req.body.prezime;
            let specijalizacija = req.body.specijalizacija;
            let ime = req.body.ime;
            let tip = "lekar";
            korisnik_1.default.find({ 'tip': tip, 'ime': ime, 'prezime': prezime, 'specijalizacija': specijalizacija }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map