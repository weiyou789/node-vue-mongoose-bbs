/**
 * Created by root on 2017/4/24.
 */
/**
 * @namespace API
 * @description 接口相关
 * */
const session = require('koa-session');
const User = require('../schema/user');
const Arts = require('../schema/arts');
const error = require('../utils/snError');
const constant = require('../utils/constant');
const logger = require("../utils/logger").getLogger(__filename.split("/").pop());
const _ = require('lodash');


let addart = async (ctx,next) => {
    try{
        if(!ctx.headers['authorization'])return ctx.body = constant.NO_AUTH;
        let art = new Arts(ctx.request.body);
        art = await art.save();
        ctx.body = Object.assign({result: art}, constant.SUCCESS);
        return next();
    }catch(err){
        ctx.body = error('write', err);
        return next();
    }
}

let getarts = async (ctx,next) => {
    try{
        let r = await Arts.find();
        ctx.body = Object.assign({result: r}, constant.SUCCESS);
        return next();
    }catch(err){
        ctx.body = error('getarts', err);
        return next();
    }
}

let getuserarts = async (ctx,next) =>{
    try{
        if(!ctx.headers['authorization'])return ctx.body = constant.NO_AUTH;
        let r = await Arts.find({_user: ctx.params._id});
        ctx.body = Object.assign({result: r}, constant.SUCCESS);
        return next();
    }catch(err){
        ctx.body = error('getuserarts', err);
        return next();
    }
}

module.exports = function (app) {
    app.post("/server/write", addart);
    app.get("/server/arts/", getarts);
    app.get("/server/userarts/:_id", getuserarts);
};