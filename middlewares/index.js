function logReqRes(filename){
    return (req,res,next)=>{
        fs.appendFile("log.txt",
            `${Date.now()}: ${req.method} PATH: ${req.path} from IP: ${req.ip}\n`
            ,(err,data)=>{
                next();
            }
        );
    }
}

module.exports = {
    logReqRes,
}