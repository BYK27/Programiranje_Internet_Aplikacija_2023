"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const specijalizacija_controller_1 = require("../controllers/specijalizacija.controller");
const specijalizacijaRouter = express_1.default.Router();
specijalizacijaRouter.route('/getAllSpecijalizacija').get((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().getAllSpecijalizacija(req, res));
specijalizacijaRouter.route('/insertSpecijalizacija').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().insertSpecijalizacija(req, res));
exports.default = specijalizacijaRouter;
//# sourceMappingURL=specijalizacija.route.js.map