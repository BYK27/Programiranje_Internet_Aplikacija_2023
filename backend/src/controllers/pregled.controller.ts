import express from 'express'
import PregledModel from '../models/pregled'

export class PregledController{


    //GET
    getBazniPregledByLekar = (req: express.Request, res: express.Response)=>{
        let lekar = req.body.lekar;
        let status = "bazni"
        PregledModel.find({'lekar': lekar, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getAllBazniPregled = (req: express.Request, res: express.Response)=>{
        let status = "bazni"
        PregledModel.find({'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getAllPendingPregled = (req: express.Request, res: express.Response)=>{
        let status = "pending"
        PregledModel.find({'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getZakazaniPregledByLekar = (req: express.Request, res: express.Response)=>{
        let lekar = req.body.lekar;
        let status = "zakazan"
        PregledModel.find({'lekar': lekar, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getPregledByPacijent = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;
        PregledModel.find({'pacijent': pacijent}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getBazniPregledByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let status = "bazni"
        PregledModel.findOne({'naziv': naziv, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    insertPregled = (req: express.Request, res: express.Response)=>{
        let pregled = new PregledModel({
            lekar: req.body.lekar,
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            pocetak: req.body.pocetak,
            cena: req.body.cena,
            status: req.body.status,
            datum: req.body.datum,
            pacijent: req.body.pacijent,
            ordinacija: req.body.ordinacija,
            specijalizacija: req.body.specijalizacija,
            komentar: "",
            izvestaj: req.body.izvestaj,
            obavesten: false
        })

        pregled.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert pregled ok"})
        })
    }

    insertPendingOrBazniPregled = (req: express.Request, res: express.Response)=>{
        let pregled = new PregledModel({
            lekar: req.body.lekar,
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            cena: req.body.cena,
            status: req.body.status,
            specijalizacija: req.body.specijalizacija,
            izvestaj: req.body.izvestaj
        })

        pregled.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert pregled ok"})
        })
    }

    getPregledByLekarSpecijalizacija = (req: express.Request, res: express.Response)=>{
        let lekar = req.body.lekar;
        let specijalizacija = req.body.specijalizacija
        let status = "zakazan"
        PregledModel.find({'lekar': lekar, 'specijalizacija' : specijalizacija, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getBazniPregledBySpecijalizacija = (req: express.Request, res: express.Response)=>{
        let specijalizacija = req.body.specijalizacija;
        let status = "bazni"
        PregledModel.find({'status': status, 'specijalizacija': specijalizacija}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getZakazanPregledNoIzvestaj = (req: express.Request, res: express.Response)=>{
        let izvestaj = false
        let status = "zakazan"
        PregledModel.find({'status': status, 'izvestaj': izvestaj}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getZakazanPregledNoIzvestajByNazivLekarPocetakDatum = (req: express.Request, res: express.Response)=>{
        let izvestaj = false
        let status = "zakazan"

        let naziv = req.body.naziv
        let lekar = req.body.lekar
        let pocetak = req.body.pocetak
        let datum = req.body.datum

        PregledModel.findOne({'status': status, 'izvestaj': izvestaj, 'naziv': naziv, 'lekar' : lekar, 'pocetak': pocetak, 'datum': datum}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }



    //UPDATE
    updateNazivByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let novi_naziv = req.body.novi_naziv
        let status = "bazni"
        PregledModel.updateOne({'naziv': naziv, 'status': status}, {$set: {'naziv': novi_naziv}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'naziv updated'})
        })
    }
    updateTrajanjevByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let sat = req.body.sat;
        let minut = req.body.minut
        let status = "bazni"
        PregledModel.updateOne({'naziv': naziv, 'status': status}, {$set: {'trajanje.0': sat, 'trajanje.1': minut}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'trajanje trajanje'})
        })
    }
    updateCenaByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let cena = req.body.cena
        let status = "bazni"
        PregledModel.updateOne({'naziv': naziv, 'status': status}, {$set: {'cena': cena}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'cena updated'})
        })
    }
    updateSpecijalizacijaByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija
        let status = "bazni"
        PregledModel.updateOne({'naziv': naziv, 'status': status}, {$set: {'specijalizacija': specijalizacija}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'specijalizacija updated'})
        })
    }
    updateStatusByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let status = req.body.status

        PregledModel.updateOne({'naziv': naziv}, {$set: {'status': status}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'naziv updated'})
        })
    }
    updateBazniLekarByNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let status = "bazni"
        let lekar = req.body.lekar

        PregledModel.updateOne({'naziv': naziv, 'status': status}, {$set: {'lekar': lekar}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'lekar updated'})
        })
    }
    updateZakazanByNazivLekarPocetakDatum = (req: express.Request, res: express.Response)=>{
        let izvestaj = true
        let status = "zakazan"

        let naziv = req.body.naziv
        let lekar = req.body.lekar
        let pocetak = req.body.pocetak
        let datum = req.body.datum

        PregledModel.updateOne({'status': status, 'naziv': naziv, 'lekar' : lekar, 'pocetak': pocetak, 'datum': datum}, {$set: {'izvestaj': izvestaj}},(err, user)=>{
            if(err) console.log(err)
            else res.json({'message': 'izvestaj updated'})

        })
    }
    updateObavestenByNazivLekarPocetakDatum = (req: express.Request, res: express.Response)=>{
        let obavesten = true
        let status = "zakazan"

        let naziv = req.body.naziv
        let lekar = req.body.lekar
        let pocetak = req.body.pocetak
        let datum = req.body.datum

        PregledModel.updateOne({'status': status, 'naziv': naziv, 'lekar' : lekar, 'pocetak': pocetak, 'datum': datum}, {$set: {'obavesten': obavesten}},(err, user)=>{
            if(err) console.log(err)
            else res.json({'message': 'obavesten updated'})

        })
    }
    

    deletePregled = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let status = "izbrisan"

        PregledModel.updateOne({'naziv': naziv}, {$set: {'status': status}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'pregled deleted'})
        })
    }

    otkaziPregled = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let lekar = req.body.lekar;
        let sat = req.body.sat;
        let minut = req.body.minut;
        let datum = req.body.datum
        let komentar = req.body.komentar
        let status = "otkazan"


        PregledModel.updateOne({'naziv': naziv, 'pocetak.0': sat, 'pocetak.1': minut, 'datum': datum, 'lekar': lekar}, {$set: {'status': status, 'komentar': komentar}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'pregled deleted'})
        })
    }

    

    
}