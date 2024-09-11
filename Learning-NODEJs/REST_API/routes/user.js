const express = require("express");
const router = express.Router(); //Ek seprate,isolated router banaya.. //Ye ROUTER Sirf /user ke liye ha..
const User = require("../models/user.models");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router
.get("/", getUsers)
.post("/", createUser);

router
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;
