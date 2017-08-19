/**
 * Created by root on 2017/06/22.
 */
const mongoose = require('../database/mongo');
const Schema = mongoose.Schema;
let ArtsSchema = new Schema({
    arttitle:{type: String, required: [true, 'listtitle is required.']},
    artcon: {type: String, required: [true, 'listcon is required.']},
    created_time: {type: Date, default: Date.now},
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Arts = mongoose.model('Arts', ArtsSchema);

module.exports = Arts;