import express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'

export class SpecijalizacijaController{

    //GET
    getAllSpecijalizacija = (req: express.Request, res: express.Response)=>{
        SpecijalizacijaModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })

    }

    //INSERT
    insertSpecijalizacija = (req: express.Request, res: express.Response)=>{
        let specijalizacija = new SpecijalizacijaModel({
            naziv: req.body.naziv
        })

        specijalizacija.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert specijalizacija ok"})
        })
    }
}