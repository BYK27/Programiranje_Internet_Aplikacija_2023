"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Izvestaj = new Schema({
    datum: { type: String },
    vreme: { type: Array },
    lekar: { type: String },
    specijalizacija: { type: String },
    razlog: { type: String },
    dijagnoza: { type: String },
    terapija: { type: String },
    naredni: { type: String },
    pacijent: { type: String },
    pregled: { type: String }
});
exports.default = mongoose_1.default.model('IzvestajModel', Izvestaj, 'izvestaji');
//# sourceMappingURL=izvestaj.js.map