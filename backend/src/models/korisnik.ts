import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    kor_ime: {type: String},
    lozinka: {type: String},
    ime: {type: String},
    prezime: {type: String},
    adresa: {type: String},
    telefon: {type: String},
    mejl: {type: String},
    tip: {type: String},
    slika: {type: String},
    status: {type: String},
    licenca: {type: String},
    specijalizacija: {type: String},
    ordinacija: {type: String},
    godisnji_pocetak: {type: String},
    godisnji_kraj: {type: String},
    slobodan_dan: {type: Array}
})

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici')