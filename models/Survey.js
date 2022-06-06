import mongoose from "mongoose";
import recipientSchema from "./Recipient.js";
const {Schema} = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: {type: Number, default:0},
    no: {type: Number, default:0},
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSend: Date,
    lastResponded: Date
});

mongoose.model('Surveys', surveySchema);
