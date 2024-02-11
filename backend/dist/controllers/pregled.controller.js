"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PregledController = void 0;
const pregled_1 = __importDefault(require("../models/pregled"));
class PregledController {
    constructor() {
        //GET
        this.getBazniPregledByLekar = (req, res) => {
            let lekar = req.body.lekar;
            let status = "bazni";
            pregled_1.default.find({ 'lekar': lekar, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllBazniPregled = (req, res) => {
            let status = "bazni";
            pregled_1.default.find({ 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllPendingPregled = (req, res) => {
            let status = "pending";
            pregled_1.default.find({ 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getZakazaniPregledByLekar = (req, res) => {
            let lekar = req.body.lekar;
            let status = "zakazan";
            pregled_1.default.find({ 'lekar': lekar, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getPregledByPacijent = (req, res) => {
            let pacijent = req.body.pacijent;
            pregled_1.default.find({ 'pacijent': pacijent }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getBazniPregledByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let status = "bazni";
            pregled_1.default.findOne({ 'naziv': naziv, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.insertPregled = (req, res) => {
            let pregled = new pregled_1.default({
                lekar: req.body.lekar,
                naziv: req.body.naziv,
                trajanje: req.body.trajanje,
                pocetak: req.body.pocetak,
                cena: req.body.cena,
                status: req.body.status,
                datum: req.body.datum,
                pacijent: req.body.pacijent,
                ordinacija: req.body.ordinacija,
                specijalizacija: req.body.specijalizacija,
                komentar: "",
                izvestaj: req.body.izvestaj,
                obavesten: false
            });
            pregled.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert pregled ok" });
            });
        };
        this.insertPendingOrBazniPregled = (req, res) => {
            let pregled = new pregled_1.default({
                lekar: req.body.lekar,
                naziv: req.body.naziv,
                trajanje: req.body.trajanje,
                cena: req.body.cena,
                status: req.body.status,
                specijalizacija: req.body.specijalizacija,
                izvestaj: req.body.izvestaj
            });
            pregled.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert pregled ok" });
            });
        };
        this.getPregledByLekarSpecijalizacija = (req, res) => {
            let lekar = req.body.lekar;
            let specijalizacija = req.body.specijalizacija;
            let status = "zakazan";
            pregled_1.default.find({ 'lekar': lekar, 'specijalizacija': specijalizacija, 'status': status }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getBazniPregledBySpecijalizacija = (req, res) => {
            let specijalizacija = req.body.specijalizacija;
            let status = "bazni";
            pregled_1.default.find({ 'status': status, 'specijalizacija': specijalizacija }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getZakazanPregledNoIzvestaj = (req, res) => {
            let izvestaj = false;
            let status = "zakazan";
            pregled_1.default.find({ 'status': status, 'izvestaj': izvestaj }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getZakazanPregledNoIzvestajByNazivLekarPocetakDatum = (req, res) => {
            let izvestaj = false;
            let status = "zakazan";
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            let pocetak = req.body.pocetak;
            let datum = req.body.datum;
            pregled_1.default.findOne({ 'status': status, 'izvestaj': izvestaj, 'naziv': naziv, 'lekar': lekar, 'pocetak': pocetak, 'datum': datum }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        //UPDATE
        this.updateNazivByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let novi_naziv = req.body.novi_naziv;
            let status = "bazni";
            pregled_1.default.updateOne({ 'naziv': naziv, 'status': status }, { $set: { 'naziv': novi_naziv } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'naziv updated' });
            });
        };
        this.updateTrajanjevByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let sat = req.body.sat;
            let minut = req.body.minut;
            let status = "bazni";
            pregled_1.default.updateOne({ 'naziv': naziv, 'status': status }, { $set: { 'trajanje.0': sat, 'trajanje.1': minut } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'trajanje trajanje' });
            });
        };
        this.updateCenaByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let cena = req.body.cena;
            let status = "bazni";
            pregled_1.default.updateOne({ 'naziv': naziv, 'status': status }, { $set: { 'cena': cena } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'cena updated' });
            });
        };
        this.updateSpecijalizacijaByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            let status = "bazni";
            pregled_1.default.updateOne({ 'naziv': naziv, 'status': status }, { $set: { 'specijalizacija': specijalizacija } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'specijalizacija updated' });
            });
        };
        this.updateStatusByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let status = req.body.status;
            pregled_1.default.updateOne({ 'naziv': naziv }, { $set: { 'status': status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'naziv updated' });
            });
        };
        this.updateBazniLekarByNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let status = "bazni";
            let lekar = req.body.lekar;
            pregled_1.default.updateOne({ 'naziv': naziv, 'status': status }, { $set: { 'lekar': lekar } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'lekar updated' });
            });
        };
        this.updateZakazanByNazivLekarPocetakDatum = (req, res) => {
            let izvestaj = true;
            let status = "zakazan";
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            let pocetak = req.body.pocetak;
            let datum = req.body.datum;
            pregled_1.default.updateOne({ 'status': status, 'naziv': naziv, 'lekar': lekar, 'pocetak': pocetak, 'datum': datum }, { $set: { 'izvestaj': izvestaj } }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'izvestaj updated' });
            });
        };
        this.updateObavestenByNazivLekarPocetakDatum = (req, res) => {
            let obavesten = true;
            let status = "zakazan";
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            let pocetak = req.body.pocetak;
            let datum = req.body.datum;
            pregled_1.default.updateOne({ 'status': status, 'naziv': naziv, 'lekar': lekar, 'pocetak': pocetak, 'datum': datum }, { $set: { 'obavesten': obavesten } }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'obavesten updated' });
            });
        };
        this.deletePregled = (req, res) => {
            let naziv = req.body.naziv;
            let status = "izbrisan";
            pregled_1.default.updateOne({ 'naziv': naziv }, { $set: { 'status': status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'pregled deleted' });
            });
        };
        this.otkaziPregled = (req, res) => {
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            let sat = req.body.sat;
            let minut = req.body.minut;
            let datum = req.body.datum;
            let komentar = req.body.komentar;
            let status = "otkazan";
            pregled_1.default.updateOne({ 'naziv': naziv, 'pocetak.0': sat, 'pocetak.1': minut, 'datum': datum, 'lekar': lekar }, { $set: { 'status': status, 'komentar': komentar } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'pregled deleted' });
            });
        };
    }
}
exports.PregledController = PregledController;
//# sourceMappingURL=pregled.controller.js.map