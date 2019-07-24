const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');

//@route  GET  api/contacts
//@desc   Get all contacts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST  api/contacts/
//@desc   Add new contact
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('firstname', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // only for routes that accept data and need validation
    const errors = validationResult(req); //Checks request for errors
    // if there are errors return 404 (bad request) send json object with the errors inside
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // if there are no errors
    const {
      firstname,
      lastname,
      email,
      phone,
      phonetype,
      phoneext,
      referedby,
      movedate,
      contactcomments
    } = req.body; //destructure from the body of the request

    try {
      // Create a new contact
      const newContact = new Contact({
        firstname,
        lastname,
        email,
        phone,
        phonetype,
        phoneext,
        referedby,
        movedate,
        contactcomments,
        user: req.user.id
      });

      // Save the new contact in the data base
      const contact = await newContact.save();

      // return the new contact
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  PUT  api/contacts/:id
//@desc   Update contact
//@access Private
router.put('/:id', auth, async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    phonetype,
    phoneext,
    referedby,
    movedate,
    contactcomments
  } = req.body; //destructure from the body of the request

  // Build a contact object
  const contactFields = {};
  if (firstname) contactFields.firstname = firstname;
  if (lastname) contactFields.lastname = lastname;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (phonetype) contactFields.phonetype = phonetype;
  if (phoneext) contactFields.phoneext = phoneext;
  if (referedby) contactFields.referedby = referedby;
  if (movedate) contactFields.movedate = movedate;
  if (contactcomments) contactFields.contactcomments = contactcomments;

  try {
    // find the contact by id
    let contact = await Contact.findById(req.params.id);

    // if there is no contact
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // if there is a contact make sure it is the users
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    // Send the updated contact
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE  api/contacts/:id
//@desc   Delete contact
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // find the contact by id
    let contact = await Contact.findById(req.params.id);

    // if there is no contact
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // if there is a contact make sure it is the users
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the contact
    await Contact.findByIdAndRemove(req.params.id);

    // Send the updated contact
    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
