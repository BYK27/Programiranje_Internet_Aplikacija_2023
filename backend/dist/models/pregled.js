"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Pregled = new Schema({
    lekar: { type: String },
    naziv: { type: String },
    trajanje: { type: Array },
    pocetak: { type: Array },
    cena: { type: Number },
    status: { type: String },
    specijalizacija: { type: String },
    datum: { type: String },
    pacijent: { type: String },
    ordinacija: { type: String },
    komentar: { type: String },
    izvestaj: { type: Boolean },
    obavesten: { type: Boolean }
});
exports.default = mongoose_1.default.model('PregledModel', Pregled, 'pregledi');
//# sourceMappingURL=pregled.js.map