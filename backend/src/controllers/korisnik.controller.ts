import express from 'express'
import KorisnikModel from '../models/korisnik'

export class KorisnikController{
    login = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        let status = "registrovan"

        KorisnikModel.findOne({'kor_ime': kor_ime, 'lozinka': lozinka, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    register = (req: express.Request, res: express.Response)=>{
        let user = new KorisnikModel({
            kor_ime: req.body.kor_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            tip: "pacijent",
            slika: req.body.slika,
            status: "neregistrovan"
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert ok"})
        })
    }
    registerLekar = (req: express.Request, res: express.Response)=>{
        let user = new KorisnikModel({
            kor_ime: req.body.kor_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            tip: "lekar",
            licenca: req.body.licenca,
            specijalizacija: req.body.specijalizacija,
            ordinacija: req.body.ordinacija,
            slika: req.body.slika,
            status: "registrovan"
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "insert lekar ok"})
        })
    }


    //GETTERS
    getKorisnikByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;

        KorisnikModel.findOne({'kor_ime': kor_ime}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getKorisnikByKorMail = (req: express.Request, res: express.Response)=>{

        let mejl = req.body.mejl;

        KorisnikModel.findOne({'mejl': mejl}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getKorisnikByNeregistrovan = (req: express.Request, res: express.Response)=>{

        let tip = "pacijent";
        let status = "neregistrovan"

        KorisnikModel.find({'tip': tip, 'status': status}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    //SETTERS
    updateLozinkaByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update lozinka ok'})
            }
        })
    }
    updateImeByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let ime = req.body.ime

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'ime': ime}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update ime ok'})
            }
        })
    }
    updateKorImeByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'kor_ime': kor_ime}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update ime ok'})
            }
        })
    }
    updatePrezimeByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let prezime = req.body.prezime

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'prezime': prezime}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update prezime ok'})
            }
        })
    }
    updateAdresuByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let adresa = req.body.adresa

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'adresa': adresa}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update adresa ok'})
            }
        })
    }
    updateTelefonByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let telefon = req.body.telefon

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'telefon': telefon}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update telefon ok'})
            }
        })
    }
    updateSlikaByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let slika = req.body.slika

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'slika': slika}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update slika ok'})
            }
        })
    }
    updateLicencaByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let licenca = req.body.licenca;
        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'licenca': licenca}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update licenca ok'})
            }
        })
    }
    updateSpecijalizacijaByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let specijalizacija = req.body.specijalizacija

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'specijalizacija': specijalizacija}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update specijalizacija ok'})
            }
        })
    }
    updateOrdinacijaByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let ordinacija = req.body.ordinacija

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'ordinacija': ordinacija}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update ordinacija ok'})
            }
        })
    }
    updateStatusByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let status = req.body.status

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'status': status}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update status ok'})
            }
        })
    }
    updateGodisnjiByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let godisnji_pocetak = req.body.godisnji_pocetak
        let godisnji_kraj = req.body.godisnji_kraj

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$set: {'godisnji_pocetak': godisnji_pocetak, 'godisnji_kraj': godisnji_kraj}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update godisnji ok'})
            }
        })
    }
    
    insertSlobodanDanByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let slobodan_dan = req.body.slobodan_dan

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {$push: {'slobodan_dan': slobodan_dan}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'update slobodniDan ok'})
            }
        })
    }

    deleteByKorIme = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;

        KorisnikModel.deleteOne({'kor_ime': kor_ime}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'delete korisnik ok'})
            }
        })
    }



    getAllLekari = (req: express.Request, res: express.Response)=>{

        let tip = "lekar";

        KorisnikModel.find({'tip': tip}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getAllPacijenti = (req: express.Request, res: express.Response)=>{

        let tip = "pacijent";

        KorisnikModel.find({'tip': tip}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    //LEKAR search with one parameter
    getLekariByIme = (req: express.Request, res: express.Response)=>{

        let ime = req.body.ime;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'ime': ime}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getLekariByPrezime = (req: express.Request, res: express.Response)=>{

        let prezime = req.body.prezime;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'prezime': prezime}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getLekariBySpecijalizacija = (req: express.Request, res: express.Response)=>{

        let specijalizacija = req.body.specijalizacija;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'specijalizacija': specijalizacija}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }


    //LEKAR search with two parameters
    getLekariByImePrezime = (req: express.Request, res: express.Response)=>{

        let prezime = req.body.prezime;
        let ime = req.body.ime;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'ime': ime, 'prezime': prezime}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getLekariByImeSpecijalizacija = (req: express.Request, res: express.Response)=>{

        let specijalizacija = req.body.specijalizacija;
        let ime = req.body.ime;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'ime': ime, 'specijalizacija': specijalizacija}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    getLekariByPrezimeSpecijalizacija = (req: express.Request, res: express.Response)=>{

        let prezime = req.body.prezime;
        let specijalizacija = req.body.specijalizacija;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'specijalizacija': specijalizacija, 'prezime': prezime}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }


    //LEKAR search with three parameters
    getLekariByImePrezimeSpecijalizacija = (req: express.Request, res: express.Response)=>{

        let prezime = req.body.prezime;
        let specijalizacija = req.body.specijalizacija;
        let ime = req.body.ime;
        let tip = "lekar";

        KorisnikModel.find({'tip': tip, 'ime': ime, 'prezime': prezime, 'specijalizacija': specijalizacija}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
}