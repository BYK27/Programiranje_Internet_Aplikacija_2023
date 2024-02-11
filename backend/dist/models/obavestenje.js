"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Obavestenje = new Schema({
    naziv: { type: String },
    pacijent: { type: String },
    status: { type: String },
    id: { type: Number }
});
exports.default = mongoose_1.default.model('ObavestenjeModel', Obavestenje, 'obavestenja');
//# sourceMappingURL=obavestenje.js.map