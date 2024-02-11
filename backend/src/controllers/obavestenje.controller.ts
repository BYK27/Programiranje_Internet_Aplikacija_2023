import express from 'express'
import ObavestenjeModel from '../models/obavestenje'

export class ObavestenjeController{

    //GET
    getAllObavestenja = (req: express.Request, res: express.Response)=>{
        ObavestenjeModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    getObavestenjaByPacijent = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent
        ObavestenjeModel.find({'pacijent': pacijent}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    updateObavestenjeStatusById = (req: express.Request, res: express.Response)=>{
        let id = req.body.id
        let status = "procitan"
        ObavestenjeModel.updateOne({'id': id}, {$set:{'status': status}} , (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    obavestiSvePacijente = (req: express.Request, res: express.Response)=>{
        let obavestenje = new ObavestenjeModel({
            naziv: req.body.naziv,
            pacijent: req.body.pacijent,
            status: "neprocitan",
            id: req.body.id
        })

        obavestenje.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert obavestenje ok"})
        })
    }
}