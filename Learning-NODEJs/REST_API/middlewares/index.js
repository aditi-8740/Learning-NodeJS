const fs = require('fs');

function logReqRes(filename){
    return (req,res,next)=>{
        const current_date = new Date().toLocaleString();
        fs.appendFile(filename , `${current_date} : ${req.method} ${req.path} ${req.ip}\n`,(err,result)=>{
          next();
        })
      }
}

module.exports = {
    logReqRes
}
