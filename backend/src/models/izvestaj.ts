import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    datum: {type: String},
    vreme: {type: Array},
    lekar: {type: String},
    specijalizacija: {type: String},
    razlog: {type: String},
    dijagnoza: {type: String},
    terapija: {type: String},
    naredni: {type: String},
    pacijent: {type: String},
    pregled: {type: String}
})

export default mongoose.model('IzvestajModel', Izvestaj, 'izvestaji')