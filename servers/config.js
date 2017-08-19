module.exports = {
    "DEV": {
        mongoUrl: 'localhost:27017/webbbs'
        , opts: {
            server: {reconnectInterval: 3000, reconnectTries: 600, auto_reconnect: true}
            , user: 'root'
            , pass: '775852016'
        }
    },
    "SIT": {},
    "PRE": {
        mongoUrl: 'mongodb://localhost:27017,localhost:27017,localhost:27017/webbbs'
        , opts: {
            server: {reconnectInterval: 3000, reconnectTries: 600, auto_reconnect: true}
            , user: 'root'
            , pass: '775852016'
        }
    },
    "PRD": {
        mongoUrl: 'mongodb://localhost:27017/webbbs'
        , opts: {
            server: {reconnectInterval: 3000, reconnectTries: 600, auto_reconnect: true}
        }
    }
}[process.env.NODE_ENV || "PRD"];