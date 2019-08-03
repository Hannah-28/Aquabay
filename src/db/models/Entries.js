import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    pH: {
        type: String,
    },

    total_dissolved: {
        type: String,
    },
    waterHardness: {
        type: String,
    },
    conductivity: {
        type: String,
    },
    totalPetHyd: {
        type: String,
    },
    benzene_mg: {
        type: String,
    },
    toluene_mg: {
        type: String,
    },
    ethlybenzene_mg: {
        type: String,
    },
    xylene_mg: {
        type: String,
    },
    cadmium_mg: {
        type: String,
    },
    zinc_mg: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now
    }   
});

let EntryModel = mongoose.model("Entry", EntrySchema);
 
module.exports = EntryModel;