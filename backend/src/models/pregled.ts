import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    lekar: {type: String},
    naziv: {type: String},
    trajanje: {type: Array},
    pocetak: {type: Array},
    cena: {type: Number},
    status: {type: String},
    specijalizacija: {type: String},
    datum: {type: String},
    pacijent: {type: String},
    ordinacija: {type: String},
    komentar: {type: String},
    izvestaj: {type: Boolean},
    obavesten: {type: Boolean}
})

export default mongoose.model('PregledModel', Pregled, 'pregledi')