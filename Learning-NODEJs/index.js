const fs = require('fs');
const os = require('os');

console.log(os.cpus().length); // My computer has 8 CPUs //Max thread size= 8

// console.log(1);

// Blocking req.. Synchronous req..
const result = fs.readFileSync("./test.txt","utf-8");
// console.log(result);

// Non Blocking req.. Asynchronous req..
fs.readFile("./test.txt","utf-8",(err,result)=>{
    // console.log(result);
})
// console.log(2);

