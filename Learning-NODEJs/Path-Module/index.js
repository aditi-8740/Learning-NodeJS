// Path module  built-in module
//              provides  a way of working with file and directory paths


const path = require('node:path');  //this prefix tells node thT IT IS a built-in module..

//PROPERTIES & METHODS of Path module -

console.log(__filename);  //Full Path to the file
console.log(__dirname);   //Full Path to the folder

console.log(path.basename(__filename));  //basename- returns the last portion of the path
console.log(path.basename(__dirname));

console.log(path.extname(__filename));   //Extname - returns the extension of the path
console.log(path.extname(__dirname));

console.log(path.parse(__filename));   //parse- returns an object whose properties represents significant elements of the path
console.log(path.parse(__dirname).root);

console.log(path.format(path.parse(__filename)));  //format- returns a path string ,given i/p an object

console.log(path.isAbsolute(__filename));  //absolute- returns whether given path is absolute path or not
console.log(path.isAbsolute("./dir"));

console.log("\n");
console.log(path.join("folder1" , "folder2" , "index.html"));  //join- joins all given path segments together using the platform specific generator as a delimiter and then normalizes the resulting path (accepts one or more strings as arguments)
console.log(path.join("/folder1" , "folder2" , "index.html"));
console.log(path.join("/folder1" , "//folder2" , "index.html"));
console.log(path.join("/folder1" , "/folder2" , "../index.html"));
console.log(path.join(__dirname, "main.js"));

console.log("\n\n");                                                    //resolve- which resolves a sequence of paths or path segments into an absolute path
console.log(path.resolve("folder1" , "folder2" , "index.html"));
console.log(path.resolve("/folder1" , "folder2" , "index.html"));
console.log(path.resolve("/folder1" , "//folder2" , "index.html"));   //folder2 is considered rooth directory
console.log(path.resolve( "./index.html"));  //*** 
console.log(path.resolve(__dirname, "main.js"));
