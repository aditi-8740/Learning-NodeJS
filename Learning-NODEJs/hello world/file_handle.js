const fs = require('fs')

// File CREATE and WRITE  
// Sync...call    PATH DEFINE       (BLOCKING & NON-BLOCKING REQUEST!)
// fs.writeFileSync('./text.txt',"HELLO WORLD \n.this is the text file i.e. creted using 'writeFileSync'");

// Async...
// fs.writeFile('./text.txt',"HELLO WORLD Async... \n.this is the text file i.e. creted using 'writeFileSync'" ,(err)=>{});


// FILE READ
// const result = fs.readFileSync('./contacts.txt',"utf-8");  //Kuch return karta ha...
// console.log(result);

// fs.readFile('./contacts.txt' , "utf-8" , (err,result)=>{  //Kuch return nahi karta...
//     if (err) {
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// })

fs.appendFileSync('./text.txt', `${Date.now()} Hey there\n`)    //can make log.txt file for all requests with time for monitoring

// fs.cpSync('./text.txt','./copy.txt')

// fs.unlinkSync('./copy.txt')  //DELETE FILE

console.log(fs.statSync('./text.txt'));

// fs.mkdirSync("mydoc");
fs.mkdirSync("mydoc/a/b",{recursive: true});

fs.renameSync('./contact.txt','./contacts.txt')

