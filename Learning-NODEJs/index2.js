var express = require('express');
var router = express.Router();

// var b; //kitne hi global variables banogee.. POLLUTING GLOBAL SPACE..

router.get('/', function(req, res) {    // var a =12; b=100;
  res.render('index');
});

router.get('/contact', function(req, res) {   //console.log(b);  // console.log(a); // a is not defined
  res.render('index');
});

router.get('/failed', function(req, res) {
  //FLASH messages allows ki eis route ka data dusre route ma use kr sake.
  req.flash("age",12);
  req.flash("name","aditi sharma")
  res.send('FLASH message made...');
});

router.get('/checked', function(req, res) {
  console.log(req.flash("age") , req.flash("name"));
  res.send('reading flash message');
});



module.exports = router;


// router.get('/profile', function(req, res) {
//   // Agar login ho jaaye to LOGIN page ke baad profile page bana doo..
//   // If LOGIN failed then muje eis route se /error route ma le jao & then waha dekhao error..(EK ROUTE ka data dusre Route ma nahi use kr sakte.)
//   res.render('index');
// });