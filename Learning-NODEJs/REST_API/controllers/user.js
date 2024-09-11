// It contains function that we attach with routes
const User = require("../models/user.models");

//@desc Get all users
// @route GET /users
//@access public
const getUsers = async (req, res) => {
  const allDBusers = await User.find();
  res.json(allDBusers);
};

//@desc create user
// @route POST /users
//@access public
const createUser = async (req, res) => {
  const Body = req.body;
  console.log("req.body :-> ", Body);
  if (
    !Body ||
    !Body.firstName ||
    !Body.lastName ||
    !Body.email ||
    !Body.job_title ||
    !Body.gender
  ) {
    res.status(400).json({ msg: "All fields are required.." });
  }
  const existing_user = await User.findOne({ email: "Body.email" });
  if (existing_user) {
    return res.status(400).json({ error: "Email already in use." });
  }

  // CREATE DOCUMENT
  const createed_user_Object = await User.create({
    //creating is the asynchronous task, so using 'await'  Using await pauses the execution of the function until the promise returned by User.create() is either resolved or rejected.
    firstName: req.body.firstName, //If you don't use await, createed_user_Object would be a pending promise rather than the actual user object, and subsequent code might not behave as expected because it would run before the user document is created.
    lastName: req.body.lastName, //If you don't use await, the code won't wait for User.create() to finish, and createed_user_Object will be a promise, not the actual user object.
    email: req.body.email, //This can lead to issues if you try to use createed_user_Object immediately after without ensuring that the creation process has completed.
    job_title: req.body.job_title,
    gender: req.body.gender,
  });

  console.log("Created user :-> ", createed_user_Object);
  res.status(201).json({ msg: "SUCCESS! new user created" });
};

//@desc Get all users
// @route GET /users
//@access public
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    //Agar user nahi mila to user ma null store hota ha.. CAN TRY By printing it? //console.log(user);
    res.status(404).json({ error: "user not found" });
  }
  res.status(200).json(user);
};

//@desc Get all users
// @route GET /users
//@access public
const updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    email: req.body.email,
  }); //returns object that's changed without chnages..
  return res.json(await User.findById(req.params.id));
};

//@desc Get all users
// @route GET /users
//@access public
const deleteUser = async (req, res) => {
  // await User.deleteOne()
  await User.findByIdAndDelete(req.params.id);
  return res.json("user deleted");
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
