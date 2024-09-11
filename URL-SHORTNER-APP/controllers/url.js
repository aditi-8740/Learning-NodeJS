const shortid = require('shortid');
const URL = require('../models/url.models');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;   //console.log(body.url);
    if(!body.url) return res.status(400).json({error : "url is required"});
    const shortID = shortid.generate();   console.log(shortID);
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,//Original Url
        visitHistory : [],
        createdBy : req.user._id,
    })
    return res.status(201).render("home" ,{"id" : shortID , URL: [] });
}

async function handleGetAnalytics(req,res) {
    const entry = await URL.findOne({ shortId : req.params.shortid }) ;
    res.json( { TotalClicks : entry.visitHistory.length , analytics : entry.visitHistory } )

}

async function handleRedirectToOriginalURL (req,res){
    const DB_entry = await URL.findOneAndUpdate(
        { shortId : req.params.shortId },
        {
            $push: {
                visitHistory: { timestamp : Date.now()}
            } 
        });
    res.redirect(DB_entry.redirectURL);
}
module.exports = { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectToOriginalURL }