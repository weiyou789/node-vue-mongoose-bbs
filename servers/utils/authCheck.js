/**
 * Created by root on 2017/04/28.
 */
const User = require('../schema/user');
/*const wl = {
  'GET/server/projects': 1
  , 'POST/server/project': 1
  , 'GET/server/users': 1 //todo
  , 'GET/server/search': 1
  , 'GET/server/querySelect': 1
  , 'GET/server/mine': 1
  , 'POST/server/watch': 1
  , 'PUT/server/watch': 1

}*/
const constant = require("./constant");
//const uuq = require("../services/uuq");
//const userController = require("../controller/user");

module.exports = () => {
  return async (ctx, next) => {
    try {
      if(ctx.headers['authorization']){
          return next();
      }else{
          return ctx.body = constant.NO_AUTH;
        }
    } catch (err) {
      console.error('authCheck error:', err);
      return ctx.body = constant.RUNTIME_ERROR;
    }
  }
}


