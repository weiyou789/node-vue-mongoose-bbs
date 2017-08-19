"use strict";

let log4js = require('log4js');
if (process.env.NODE_ENV === "PRD") {
    //PRD
    log4js.configure({
        appenders: [
            {
                type: 'console'
                , layout: {
                type: "pattern",
                // pattern: "%d %[%-5p%] %c %m"
                pattern: "%m"
            }
            }
            , {
                "type": "dateFile",
                "filename": `/opt/logs/`,
                "pattern": `yyyy-MM-dd.log`,
                "maxLogSize": 1024,
                "backups": 10,
                "alwaysIncludePattern": true
            }
            , {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "dateFile",
                    "filename": `/opt/logs/ctemm-api.`,
                    "pattern": `yyyy-MM-dd.log`,
                    "maxLogSize": 1024,
                    "backups": 30,
                    "alwaysIncludePattern": true
                    , layout: {
                        type: "pattern",
                        pattern: "%m"
                    }
                }
            }
        ],
        levels: {
            "[all]": "DEBUG"
        }
        ,
        replaceConsole: true
    });
} else {
    //PRE
    log4js.configure({
        appenders: [
            {
                type: 'console'
                , layout: {
                type: "pattern",
                // pattern: "%d %[%-5p%] %c %m"
                pattern: "%m"
            }
            }
            , {
                "type": "dateFile",
                "filename": `/opt/logs/`,
                "pattern": `yyyy-MM-dd.log`,
                "maxLogSize": 1024,
                "backups": 10,
                "alwaysIncludePattern": true
            }
            , {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "dateFile",
                    "filename": `/opt/logs/ctemm-api.`,
                    "pattern": `yyyy-MM-dd.log`,
                    "maxLogSize": 1024,
                    "backups": 30,
                    "alwaysIncludePattern": true
                    , layout: {
                        type: "pattern",
                        pattern: "%m"
                    }
                }
            }

        ],
        levels: {
            "[all]": "ALL"
        }
        ,
        replaceConsole: true
    });

}

module.exports = log4js;