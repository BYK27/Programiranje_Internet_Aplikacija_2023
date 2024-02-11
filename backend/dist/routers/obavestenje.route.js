"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const obavestenje_controller_1 = require("../controllers/obavestenje.controller");
const obavestenjeRouter = express_1.default.Router();
obavestenjeRouter.route('/getAllObavestenja').get((req, res) => new obavestenje_controller_1.ObavestenjeController().getAllObavestenja(req, res));
obavestenjeRouter.route('/getObavestenjaByPacijent').post((req, res) => new obavestenje_controller_1.ObavestenjeController().getObavestenjaByPacijent(req, res));
obavestenjeRouter.route('/updateObavestenjeStatusById').post((req, res) => new obavestenje_controller_1.ObavestenjeController().updateObavestenjeStatusById(req, res));
obavestenjeRouter.route('/obavestiSvePacijente').post((req, res) => new obavestenje_controller_1.ObavestenjeController().obavestiSvePacijente(req, res));
exports.default = obavestenjeRouter;
//# sourceMappingURL=obavestenje.route.js.map