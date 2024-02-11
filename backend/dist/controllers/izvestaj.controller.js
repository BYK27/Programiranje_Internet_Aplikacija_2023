"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzvestajController = void 0;
const izvestaj_1 = __importDefault(require("../models/izvestaj"));
class IzvestajController {
    constructor() {
        this.getIzvestajByPacijent = (req, res) => {
            let pacijent = req.body.pacijent;
            izvestaj_1.default.find({ 'pacijent': pacijent }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.insertIzvestaj = (req, res) => {
            let izvestaj = new izvestaj_1.default({
                datum: req.body.datum,
                vreme: req.body.vreme,
                lekar: req.body.lekar,
                specijalizacija: req.body.specijalizacija,
                razlog: req.body.razlog,
                dijagnoza: req.body.dijagnoza,
                terapija: req.body.terapija,
                naredni: req.body.naredni,
                pacijent: req.body.pacijent,
                pregled: req.body.pregled
            });
            izvestaj.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert izvestaj ok" });
            });
        };
        this.getIzvestajByDatumVremeLekarPacijent = (req, res) => {
            let datum = req.body.datum;
            let sat = req.body.sat;
            let minut = req.body.minut;
            let lekar = req.body.lekar;
            let pacijent = req.body.pacijent;
            izvestaj_1.default.findOne({ 'pacijent': pacijent, 'datum': datum, 'vreme.0': sat, 'vreme.1': minut, 'lekar': lekar }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.IzvestajController = IzvestajController;
//# sourceMappingURL=izvestaj.controller.js.map