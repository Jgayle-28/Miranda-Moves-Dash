const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route  GET  api/contacts
//@desc   Get all contacts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  GET  api/contacts/:id
//@desc   Get contact by id
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    // find the contact by id
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST  api/contacts/
//@desc   Add new contact
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("first_name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
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
      opportunity_type,
      first_name,
      last_name,
      email,
      phone,
      phone_type,
      phone_ext,
      refered_by,
      move_date,
      move_time,
      contact_comments,
      estimate_time,
      estimate_date,
      target_movedate,
      pu_address,
      address2,
      do_address,
      items,
      alt_phone,
      payment_type,
      bill_to,
      pack_date,
      pack_time,
      inventory,
      moveServices
    } = req.body; //destructure from the body of the request

    try {
      // Create a new contact
      const newContact = new Contact({
        opportunity_type,
        first_name,
        last_name,
        email,
        phone,
        phone_type,
        phone_ext,
        refered_by,
        move_date,
        move_time,
        contact_comments,
        estimate_time,
        estimate_date,
        target_movedate,
        pu_address,
        address2,
        do_address,
        items,
        alt_phone,
        payment_type,
        bill_to,
        pack_date,
        pack_time,
        inventory,
        moveServices,
        user: req.user.id
      });

      // Save the new contact in the data base
      const contact = await newContact.save();
      // console.log("contact:", contact);

      // return the new contact
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  PUT  api/contacts/:id
//@desc   Update contact
//@access Private
router.put("/:id", auth, async (req, res) => {
  const {
    opportunity_type,
    first_name,
    last_name,
    email,
    phone,
    phone_type,
    phone_ext,
    refered_by,
    move_date,
    move_time,
    contact_comments,
    estimate_time,
    estimate_date,
    target_movedate,
    pu_address,
    address2,
    do_address,
    items,
    alt_phone,
    payment_type,
    bill_to,
    pack_date,
    pack_time,
    inventory,
    moveServices
  } = req.body; //destructure from the body of the request

  // Build a contact object
  const contactFields = {};
  if (opportunity_type) contactFields.opportunity_type = opportunity_type;
  if (first_name) contactFields.first_name = first_name;
  if (last_name) contactFields.last_name = last_name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (phone_type) contactFields.phone_type = phone_type;
  if (phone_ext) contactFields.phone_ext = phone_ext;
  if (refered_by) contactFields.refered_by = refered_by;
  if (move_date) contactFields.move_date = move_date;
  if (move_time) contactFields.move_time = move_time;
  if (contact_comments) contactFields.contact_comments = contact_comments;
  if (estimate_time) contactFields.estimate_time = estimate_time;
  if (estimate_date) contactFields.estimate_date = estimate_date;
  if (target_movedate) contactFields.target_movedate = target_movedate;
  if (pu_address) contactFields.pu_address = pu_address;
  if (address2) contactFields.address2 = address2;
  if (do_address) contactFields.do_address = do_address;
  if (items) contactFields.items = items;
  if (alt_phone) contactFields.alt_phone = alt_phone;
  if (payment_type) contactFields.payment_type = payment_type;
  if (bill_to) contactFields.bill_to = bill_to;
  if (pack_date) contactFields.pack_date = pack_date;
  if (pack_time) contactFields.pack_time = pack_time;
  if (inventory) contactFields.inventory = inventory;
  if (moveServices) contactFields.moveServices = moveServices;

  try {
    // find the contact by id
    let contact = await Contact.findById(req.params.id);

    // if there is no contact
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // if there is a contact make sure it is the users
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
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
    res.status(500).send("Server Error");
  }
});

//@route  DELETE  api/contacts/:id
//@desc   Delete contact
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // find the contact by id
    let contact = await Contact.findById(req.params.id);

    // if there is no contact
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // if there is a contact make sure it is the users
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete the contact
    await Contact.findByIdAndRemove(req.params.id);

    // Send the updated contact
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
