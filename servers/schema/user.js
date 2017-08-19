/**
 * Created by root on 2017/06/22.
 */
const mongoose = require('../database/mongo');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
   username: {type: String,unique:true, required: [true, 'username is required.']},
   password:{type: String, required: [true, 'password is required.']},
   /*list: {
       type: Schema.Types.ObjectId,
       ref: 'Arts'
   }*/
});

let User = mongoose.model('User', UserSchema);

module.exports = User;