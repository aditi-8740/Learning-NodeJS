const express = require("express");
const fs = require('fs');
const app = express();
const users = require("./MOCK_DATA.json");
const cors = require('cors');

// app.use(cors());

// Middleware  (Express ko nahi pata ki ye jo data ha ause kesa handle kare??) //Harr REQUEST pr ye middleware chalta ha...
app.use(express.urlencoded({extended:false}));  //Form data ko Body me dalne ka kaam karega..(Eisne FORM Data ko authaya, JS object banaya ,then Req.Body me daal diya..)//Basically ye req.body = "data object form me karke equal kr de raha ha eiske"
//clog(body) Ye undefined hoga,coz Express ko nahi pata ki ye data ko handle kesa karna ha...
// Ye HEADER ma content type ko check karta hoga ( Content-Type: application/x-wwww-form-urlencoded ) ,ye value ha to ye data ko parse karke BODY ma add krdeta hoga..
app.use(express.json()); //Frontend se JSON data ko bi parse kr sakta huu...

app.use((req,res,next)=>{
  const current_date = new Date().toLocaleString();
  fs.appendFile("log.txt",`${current_date} : ${req.method} ${req.path} ${req.ip}\n`,(err,result)=>{
    next();
  })
})
app.use((req,res,next)=>{
  console.log("Hello from middleware 1 :))");
  // return res.json({"msg":"Hello from middleware 1"});
  next();
})
app.use((req,res,next)=>{
  console.log("Hello from middleware 2 :))");
  // return res.end("Hey");    //Res. Req. cycle yahi end ho jayegaa...
  next();
})

//Routes

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((value) => `<li>${value.first_name}</li>`).join(" ")}
    </ul>
    `;
  res.send(html); //SERVER SIDE Rendered Page..
});

app.get("/api/users", cors(),(req, res) => {       //https://flaviocopes.com/http-request-headers/
  console.log(req.headers);   //Reading HEADERS Of Request
  res.setHeader("X-myname" , "aditi sharma ji");    //Setting custom headers    (HEADER specific to our application)
  // Good PRACTICE -> Always add X to custom Headers (CLIENT samaj sakta ha ki ye ek CUSTOM Header ha ,ye ek BUILT-IN Header nahi ha..)
  res.json(users); //Raw Data, JSON Data (FRONTEND apne hisab se eis data ko render kr sakta ha..)
});

// REST API
app.post("/api/users", (req, res) => {
  const body = req.body;       //console.log(req); 
  if (!body || !body.last_name || !body.first_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({"msg":"All fields are required.."})
  }
  
  console.log("Body property in REQUEST obj", body);  //Express automatically, jo bi hum frontend se data send karte hana,vo hume req.body me available hota ha...
  users.push({  id:users.length +1 , ...body});
  fs.writeFile("./MOCK_DATA.json" ,JSON.stringify(users), (err,data)=>{
      return res.status(201).json({ status: "success" , id: users.length })   //Ab RESPONSE jayega to ,to pehle hum ststus set karenge,then auske baad res. JSON send hoga...
  });   //STATUS CODE- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((value) => {
      return value.id === id; //gives the 'value' when true is returned.
    });
    // Jo user app dund rahe ha,vo exist hi nahi karta like http://localhost:8000/api/users/200000
    if (!user) {
        return res.status(404).json({"msg":"User not found"})
    }
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO : Edit the user with the given Id
    return res.status(501).json({ "msg": "The request method is not supported by the server and cannot be handled" });
  })
  .delete((req, res) => {
    // TODO : DELETE the user with the given Id
    let remo = users.splice(req.params.id -1 ,1);
    console.log(remo);
    fs.writeFile("./MOCK_DATA.json" ,JSON.stringify(users), (err,data)=>{
      return res.json({ status: "success" , id: req.params.id })
  });
  });



// app.route("/api/users/:id")
//     .get((req,res)=>{})
//     .post((req,res)=>{})
//     .patch((req,res)=>{})
//     .delete((req,res)=>{})

app.listen(8000, () => console.log("server started at PORT 8000"));

// GOOD PRACTISE :- Making a HYBRID Server -support browsers, mobile applications.
