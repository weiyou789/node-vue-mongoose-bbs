'use strict';

const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const Router = require('koa-router');
const session = require('koa-session');
const router = new Router();
const bodyParser = require("co-body");
const logger = require("./utils/logger").getLogger(__filename.split("/").pop());
const moment = require('moment');
const uuidV1 = require('uuid/v1');
const pkg = require('./package.json')
const toBase64 = require('./utils/toBase64');
const interfaces = require('os').networkInterfaces();
const isLocal = process.env.LOCAL !== undefined;
const isProd = process.env.NODE_ENV === 'PRD';
const isPre = process.env.NODE_ENV === 'PRE';
const isDev = process.env.NODE_ENV === 'DEV';
const cookieParser = require('koa-cookie');
const cors = require('koa2-cors');
const authCheck = require("./utils/authCheck");
// 扫描Action

((path) => {
    fs.readdir(path, (err, files) => {
        if (!err) {
            files.forEach((item) => {
                let tmpPath = path + '/' + item;
                fs.stat(tmpPath, (err1, stats) => {
                    if (!err1 && !stats.isDirectory()) {
                        logger.info('load action :' + tmpPath);
                        require(tmpPath)(router)
                    }
                })
            });
        }
    });
})('./actions');

//get ip
let IPv4 = '127.0.0.1';
for (var key in interfaces) {
    var alias = 0;
    interfaces[key].forEach(function (details) {
        if ((details.family == 'IPv4' && key == 'en0') || (details.family == 'IPv4' && key == 'eth0')) {
            IPv4 = details.address;
        }
    });
}

//session_setting
// app.keys = ['e5fBR2pURSXnHtGn'];
// const session_setting = {
//     key: 'ads:sess', /** (string) cookie key (default is koa:sess) */
//     maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
// };

//bootstrap
app.listen(pkg.port, function () {
  logger.info(`${pkg.name} listen at ${IPv4}:${pkg.port} in ${process.env.NODE_ENV} , pid is ${process.pid}`);
});

//middleWares

app
// .use(session(session_setting, app))
// .use((ctx, next) => {
//     if (ctx.path === '/favicon.ico') return;
//     console.log(ctx['context#contextSession']);
//     let n = ctx.session.views || 0;
//     ctx.session.views = ++n;
//     console.log(`PV: ${n} , isNew:${ctx.session.isNew}`);
//     return next();
// })
.use(async (ctx, next) => {
    if (ctx.method === "PUT" || ctx.method === "POST") {
      ctx.request.body = await bodyParser(ctx);
      await next();
    } else {
      await next();
    }
  })
    .use(cors())
  //.use(authCheck())
  .use(async (ctx, next) => {//日志
    let requestStartTime = new Date();
    let requestID = uuidV1(requestStartTime);
    logger.info(`${requestID}\t${ctx.method}\t${ctx.url}\t${JSON.stringify(ctx.request.body)}`);
    await next();
    logger.info(`${requestID}\tuse: ${ new Date() - requestStartTime }ms\treturn: ${JSON.stringify(ctx.body)}`);
  })

  .use(router.routes())//路由
  .on('error', app.onerror)//错误处理


process.on('uncaughtException', function (err) {
  let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  let cont = `${now}|${uuidV1()}|${now}|${pkg.sysCode}|${IPv4}|${pkg.name}|uncaughtException|1|${toBase64('uncaughtException')}||||||${err.message}|${err.code}|${toBase64(err.stack)}|||||1||api|0.0.0.4`;
  logger.error(cont);
});


process.on('unhandledRejection', function (reason, promise) {
  let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  let cont = `${now}|${uuidV1()}|${now}|${pkg.sysCode}|${IPv4}|${pkg.name}|unhandledRejection|1|${toBase64('unhandledRejection')}||||||${reason}|${promise}|${toBase64(reason)}|||||1||api|0.0.0.4`;
  logger.error(cont);
});


module.exports = {isDev, isPre, isLocal, IPv4, pkg, uuidV1};
