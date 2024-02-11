import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    naziv: {type: String},
    pacijent: {type: String},
    status: {type: String},
    id: {type: Number}
})

export default mongoose.model('ObavestenjeModel', Obavestenje, 'obavestenja')