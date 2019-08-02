import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    pH: {
        type: String,
    },
    waterLevel: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }   
});

let EntryModel = mongoose.model("Entry", EntrySchema);
 
module.exports = EntryModel;