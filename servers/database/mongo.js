/**
 * Created by root on 2017/4/24.
 */
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongoUrl,config.opts,(err)=>{
    if(err) console.error('mongoose.connect ',err);
});
module.exports = mongoose;