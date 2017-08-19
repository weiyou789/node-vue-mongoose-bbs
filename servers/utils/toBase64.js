/**
 * Created by root on 2017/3/22.
 */

module.exports = {
    "SIT": (data)=> {
        return data;
    },
    "DEV": (data)=> {
        return data;
    },
    "PRE": (data)=> {
        return data;
    },
    "PRD": (data)=> {
        return new Buffer(data).toString('base64');
    }
}[process.env.NODE_ENV || "PRD"]

