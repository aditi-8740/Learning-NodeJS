//CONTAINING logic for all our requests
const asyncdHandler = require('express-async-handler');
const Contact = require('../models/contact.models');                          //handle our exceptions inside the async express routes and the it's going to pass them to the express Handler

//@desc Get all contacts
// @route GET /api/contacts
//@access private
const getContacts = asyncdHandler( async (req, res) => {                     //AasyncHandler will automatically whenever an exception is occured, it's going to pass it to the error handler
  const Contacts= await Contact.find({ createdBy: req.user._id});
  res.status(200).json(Contacts);
});

//@desc Create new contact
// @route POST /api/contacts
//@access private
const createContact = asyncdHandler( async (req, res) => {
  console.log("the request body is : ",req.body);                            // without express.urlencoded(), express.json() -> req.body undefined rahegi,coz express ko nahi pata ki body data diya ha frontend pr, wo req.body ma kesa dalna??
  const {name, email, phone} = req.body;
  if ( !name || !email || !phone ){
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const created_user = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    createdBy: req.user._id,
  })
  res.status(201).json(created_user);
});                                                                          //Whenever we need to accept some data from client to our server, We need to use the body parser so that we can parse the stream of data that we r receiving from our client

//@desc Get one contact
// @route GET /api/contacts/:id
//@access private
const getContact = asyncdHandler( async (req, res) => {
  const found_Contact = await Contact.findById(req.params.id);
  if(!found_Contact){
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(200).json(found_Contact);
});

//@desc Update contact
// @route PUT /api/contacts/:id
//@access private
const updateContact = asyncdHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);  //fetch contact with id (given in params)
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  };

  if(contact.createdBy.toString() !== req.user._id){    //a different user is trying to update a contact of an another user...
    return res.status(403).json("User doesn't have permission to update other user contacts");
  }

  const updatedUser  = await Contact.findByIdAndUpdate(req.params.id , req.body ,{new:true});
  res.status(200).json( updatedUser );
});

//@desc Delete contacts
// @route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncdHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  };
  if (contact.createdBy.toString() !== req.user._id) {
    return res.status(403).json("User doesn't have permission to update other user contacts");    
  }
  const deletedUser = await Contact.findByIdAndDelete(req.params.id);
  // await contact.remove(); DEPRECATED
  res.status(200).json("User Deleted");
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

//Whenever We interact with MongoDB, We always get a promise, so in order to resolve the promise , we make use of async/await....