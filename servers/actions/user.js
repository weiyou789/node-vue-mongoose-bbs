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


let reg = async (ctx, next) => {
    try {
        let user = new User(ctx.request.body);
        user = await user.save();
        ctx.body = Object.assign({result: user}, constant.SUCCESS);
        //let r = await User.findOne({username:ctx.request.body.username});
        /*let total = await User.findOne({username:ctx.request.body.username}).count();
        if(total){
            ctx.body = Object.assign({}, constant.DUPLICATE_KEY);
        }else{
            let user = new User(ctx.request.body);
            user = await user.save();
            ctx.body = Object.assign({result: user}, constant.SUCCESS);
        }*/
        return next();
    } catch (err) {
        ctx.body = error('reg', err);
        return next();
    }
};

let login = async (ctx, next) => {
    try {
        let r = await User.findOne(ctx.request.body);
        let total = await User.where(ctx.request.body).find().select({
            username:1,
            password:1
        }).count();
        if(total){
            ctx.body = Object.assign({result: r}, constant.SUCCESS);
        }else{
            ctx.body = Object.assign({}, constant.NO_USER_PASS);
        }
        return next();
    } catch (err) {
        ctx.body = error('login', err);
        return next();
    }
};

let getinfo = async (ctx, next) => {
    try {

        //if (!ctx.params || !ctx.params.projectId || !ctx.params.apiId) throw new Error('PARAMS_ERR');
        let r = await User.where({
            _id: ctx.params._id
        }).findOne();
        if (!r) throw new Error('NO_DATA');
        ctx.body = Object.assign({result: r}, constant.SUCCESS);
        return next();
    } catch (err) {
        ctx.body = error('getinfo', err);
        return next();
    }
};



module.exports = function (app) {
    app.post("/server/reg", reg);
    app.post("/server/login", login);
    app.get("/server/user/:_id", getinfo);
};