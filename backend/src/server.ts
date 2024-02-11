import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import multer from 'multer'
import path from 'path';
import korisnikRouter from './routers/korisnik.route';
import pregledRouter from './routers/pregled.route';
import specijalizacijaRouter from './routers/specijalizacija.route';
import izvestajRouter from './routers/izvestaj.route';
import obavestenjeRouter from './routers/obavestenje.route';

//image uploading
const PATH = './uploads'
let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({
    storage: storage
});

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'Outlook', // Use a mail service provider like Gmail or configure your own SMTP server
  auth: {
    user: 'yourmail@outlook.com', // Your email address
    pass: 'your_password_here' // Your email password or an app-specific password
  }
});




//TODO: POSSIBLY DELETE
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

//mongo
const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/api', function (req, res) {
    res.end('File catcher');
});



mongoose.connect('mongodb://127.0.0.1:27017/av200599')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnici', korisnikRouter)
router.use('/pregledi', pregledRouter)
router.use('/specijalizacije', specijalizacijaRouter)
router.use('/izvestaji', izvestajRouter)
router.use('/obavestenja', obavestenjeRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
app.use('/uploads', express.static('./uploads'))

//POST file
app.post('/api/upload', upload.single('image'), function (req, res) {
    if (req == null) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
});

app.post('/send-email', (req, res) => {
  transporter.sendMail(req.body, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
})
