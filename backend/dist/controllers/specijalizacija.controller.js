"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecijalizacijaController = void 0;
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class SpecijalizacijaController {
    constructor() {
        //GET
        this.getAllSpecijalizacija = (req, res) => {
            specijalizacija_1.default.find({}, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        //INSERT
        this.insertSpecijalizacija = (req, res) => {
            let specijalizacija = new specijalizacija_1.default({
                naziv: req.body.naziv
            });
            specijalizacija.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "insert specijalizacija ok" });
            });
        };
    }
}
exports.SpecijalizacijaController = SpecijalizacijaController;
//# sourceMappingURL=specijalizacija.controller.js.map