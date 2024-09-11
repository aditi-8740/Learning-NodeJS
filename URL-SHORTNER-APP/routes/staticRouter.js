const express = require('express');
const URL = require('../models/url.models')
const router = express.Router();
// const { setUser,getUser } = require('../service/auth');
const { setUser,getUser } = require('../service/auth1');
const { model, Model } = require('mongoose');
const { restrictTo } = require('../middlewares/auth');

router.get('/admin/urls', restrictTo(["ADMIN"]) , async(req,res)=>{
    allURLs = await URL.find({ });   console.log(allURLs);
    return res.render("home" , { URL: allURLs });
})

router.get('/', restrictTo(["NORMAL","ADMIN"]) , async (req,res)=>{
    // const sessionId = req.cookies.uid;  console.log(sessionId);
    // const LoggedInUser = getUser(sessionId);   console.log(LoggedInUser);//ID denge to password mil jayegaa..
    
    //Aesa URLs jo ki LoggedIn users ke dwara create kiye gaye hoo..
    allURLs = await URL.find({ createdBy: req.user._id });   //console.log(allURLs);
    return res.render("home" , { URL: allURLs });
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports = router;
