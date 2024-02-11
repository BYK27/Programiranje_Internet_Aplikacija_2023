"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const izvestaj_controller_1 = require("../controllers/izvestaj.controller");
const izvestajRouter = express_1.default.Router();
izvestajRouter.route('/getIzvestajByPacijent').post((req, res) => new izvestaj_controller_1.IzvestajController().getIzvestajByPacijent(req, res));
izvestajRouter.route('/insertIzvestaj').post((req, res) => new izvestaj_controller_1.IzvestajController().insertIzvestaj(req, res));
izvestajRouter.route('/getIzvestajByDatumVremeLekarPacijent').post((req, res) => new izvestaj_controller_1.IzvestajController().getIzvestajByDatumVremeLekarPacijent(req, res));
exports.default = izvestajRouter;
//# sourceMappingURL=izvestaj.route.js.map