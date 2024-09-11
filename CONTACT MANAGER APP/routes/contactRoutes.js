const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/validateTokenHandler");
const {getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact } = require("../controllers/contactController");

router.use(validateToken) //all routes are protected,first user have to be validated...

router
  .route("/")
  .get(getContacts)
  .post(createContact);

router
  .route("/:id")
  .get(getContact) 
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
