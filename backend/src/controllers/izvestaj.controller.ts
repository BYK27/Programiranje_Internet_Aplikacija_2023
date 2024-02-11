import express from 'express'
import IzvestajModel from '../models/izvestaj'

export class IzvestajController{
    
    getIzvestajByPacijent = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;

        IzvestajModel.find({'pacijent': pacijent}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }


    insertIzvestaj = (req: express.Request, res: express.Response)=>{

        let izvestaj = new IzvestajModel({
            datum: req.body.datum,
            vreme: req.body.vreme,
            lekar: req.body.lekar,
            specijalizacija: req.body.specijalizacija,
            razlog: req.body.razlog,
            dijagnoza: req.body.dijagnoza,
            terapija: req.body.terapija,
            naredni: req.body.naredni,
            pacijent: req.body.pacijent,
            pregled: req.body.pregled
        })

        izvestaj.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert izvestaj ok"})
        })
    }

    getIzvestajByDatumVremeLekarPacijent = (req: express.Request, res: express.Response)=>{
        let datum = req.body.datum
        let sat = req.body.sat
        let minut = req.body.minut
        let lekar = req.body.lekar
        let pacijent = req.body.pacijent;

        IzvestajModel.findOne({'pacijent': pacijent, 'datum': datum, 'vreme.0': sat, 'vreme.1': minut, 'lekar': lekar}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

}