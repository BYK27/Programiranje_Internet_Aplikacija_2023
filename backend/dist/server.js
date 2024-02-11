"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const korisnik_route_1 = __importDefault(require("./routers/korisnik.route"));
const pregled_route_1 = __importDefault(require("./routers/pregled.route"));
const specijalizacija_route_1 = __importDefault(require("./routers/specijalizacija.route"));
const izvestaj_route_1 = __importDefault(require("./routers/izvestaj.route"));
const obavestenje_route_1 = __importDefault(require("./routers/obavestenje.route"));
//image uploading
const PATH = './uploads';
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = (0, multer_1.default)({
    storage: storage
});
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'av200599d@student.etf.bg.ac.rs',
        pass: '2710001720060' // Your email password or an app-specific password
    }
});
//TODO: POSSIBLY DELETE
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
//mongo
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.get('/api', function (req, res) {
    res.end('File catcher');
});
mongoose_1.default.connect('mongodb://127.0.0.1:27017/av200599');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/korisnici', korisnik_route_1.default);
router.use('/pregledi', pregled_route_1.default);
router.use('/specijalizacije', specijalizacija_route_1.default);
router.use('/izvestaji', izvestaj_route_1.default);
router.use('/obavestenja', obavestenje_route_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
app.use('/uploads', express_1.default.static('./uploads'));
//POST file
app.post('/api/upload', upload.single('image'), function (req, res) {
    if (req == null) {
        console.log("No file is available!");
        return res.send({
            success: false
        });
    }
    else {
        console.log('File is available!');
        return res.send({
            success: true
        });
    }
});
app.post('/send-email', (req, res) => {
    transporter.sendMail(req.body, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
});
//# sourceMappingURL=server.js.map