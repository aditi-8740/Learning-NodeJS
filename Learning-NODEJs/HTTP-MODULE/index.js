const http = require('http');
const fs = require('fs');
const url = require("url");
function myhandler(req,res) { //Ye mera callback function ha, jisse hum request ko handle kr sakte ha..
    if(req.url === "/favicon.ico") return res.end();
    const log =`${Date.now()} : ${req.method} ${req.url} New Request received\n`;
    const myUrl = url.parse(req.url,true);
    console.log(req.url);     //console.log(myUrl);   //
    console.log(req);
    fs.appendFile("log.txt",log, (err,data)=>{
        switch (myUrl.pathname) {
            case '/':   //For each route
                if(req.method === "GET") res.end("Home Page");
                break;
            case '/about':
                const myname = myUrl.query.user_name;
                res.end(`I am ${myname}`)
                break;
            case '/search':
                const mysearch = myUrl.query.search_query;
                res.end(`my search query is : ${mysearch}`)
                break;
            case '/signup':
                if(req.method ==="GET") res.end("Signup form : Enter email & password : ");
                else if(req.method ==="POST"){  //Agar Post request aati ha then
                    // Bd query processing
                    res.end("Successfully Signup! Welcome:)")
                }
            default:
                res.end("404 Not Found")
                break;
        }
        // res.end("Hello from server Again");
    });
}
const myServer = http.createServer(myhandler);

myServer.listen(8000,()=>{console.log("Server started!");})


// var adr = 'http://localhost:8080/default?year=2017&month=february';
// var q = url.parse(adr, true);
// console.log(q);