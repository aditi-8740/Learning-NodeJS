var express = require("express");
var router = express.Router();
var UserModel = require("./users");
var PostModel = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/create_user", async function (req, res, next) {
  var Created_User = await UserModel.create({
    username: "Aditi.232",
    password: "123456abcdef",
    posts: [],
    email: "abc@gmail.com",
    fullName: "aditi sharma",
  });
  res.send(Created_User);
});
router.get("/create_post", async function (req, res, next) {
  var Created_Post = await PostModel.create({
    postText: "hello ji hello!! Sabko",
    user:'66a89dd07caa519b23fd9ebf',
  });
  let user = await UserModel.findOne({_id: '66a89dd07caa519b23fd9ebf'});
  user.posts.push(Created_Post._id);
  await user.save()
  res.send(Created_Post);
});
router.get("/user_allposts", async function (req, res, next) {
  let all_posts = await UserModel.findOne({_id: '66a89dd07caa519b23fd9ebf'}).populate('posts')  //posts field ko populate kare.. Eisme IDs real data ma populate ho jayengii..
  res.send(all_posts)
});
module.exports = router;
