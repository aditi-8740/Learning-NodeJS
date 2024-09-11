//   HOW FILES will be handled in backend MONGODB ?

const express = require('express');
const multer = require('multer');       //Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
require('dotenv').config();
const app = express();
const PORT= process.env.PORT;

app.set("view engine","ejs")

// const upload = multer({dest: 'uploads/'});  //frontend se jo bi file upload hogi na, usko mere 'uploads' folder me daal doo.....
const storage = multer.diskStorage({    //The disk storage engine gives you full control on storing files to disk.
    destination: (req, file, cb)=>{
        return cb(null, './uploads');
    },
    filename: (req, file, cb)=>{ 
        return cb(null, `${Date.now()}-${file.originalname}`)       //req.user._id inplace of Date.Now() ,bi daal skte ha..      //clog(req.file) equivalent to file parameter here
    }
})                                          //https://www.npmjs.com/package/multer
const upload = multer({storage: storage});
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req,res)=>{
    return res.render("homepage");
})

app.post("/upload", upload.single('profilePhoto') , (req,res)=>{ //upload ek middleware haa,jab bi eis route pe request aaye,pehle hum file ko upload karengee..  //how to handle file...
    console.log(req.body);
    console.log(req.file);  //req.file.path ko hum apne DATABASE me store kr sakte ha, & jab bi user ko koi chez load krni ha ,vo eis path se kr sakta ha...

    return res.redirect('/')
})
app.listen(PORT, ()=>{console.log(`Server Started at PORT : ${PORT}`);})


// Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.