/**
 * Created by root on 2017/6/23.
 */
module.exports ={
    url:(v)=>{
        return /^((https|http|ftp|rtsp|mms)?:\/\/)[^s]+/.test(v);
    }
}