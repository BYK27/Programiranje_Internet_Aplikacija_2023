"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObavestenjeController = void 0;
const obavestenje_1 = __importDefault(require("../models/obavestenje"));
class ObavestenjeController {
    constructor() {
        //GET
        this.getAllObavestenja = (req, res) => {
            obavestenje_1.default.find({}, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        this.getObavestenjaByPacijent = (req, res) => {
            let pacijent = req.body.pacijent;
            obavestenje_1.default.find({ 'pacijent': pacijent }, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        this.updateObavestenjeStatusById = (req, res) => {
            let id = req.body.id;
            let status = "procitan";
            obavestenje_1.default.updateOne({ 'id': id }, { $set: { 'status': status } }, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        this.obavestiSvePacijente = (req, res) => {
            let obavestenje = new obavestenje_1.default({
                naziv: req.body.naziv,
                pacijent: req.body.pacijent,
                status: "neprocitan",
                id: req.body.id
            });
            obavestenje.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert obavestenje ok" });
            });
        };
    }
}
exports.ObavestenjeController = ObavestenjeController;
//# sourceMappingURL=obavestenje.controller.js.map