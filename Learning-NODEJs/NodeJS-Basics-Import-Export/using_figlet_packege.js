// USING ANY PACKAGE IN NODEJS :

// let one_line_JOKE_obj = require('one-liner-joke')
// console.log(one_line_JOKE_obj.getRandomJoke().body);

let figlet_Obj = require("figlet");

figlet_Obj("aditi Sharma", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
