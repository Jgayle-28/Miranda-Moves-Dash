const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//@route  POST  api/users
//@desc   Register a user
//@access Public
router.post(
  // 1st parameter = route
  '/',
  // 2nd parameter = check/ validation (Comes from express validator)
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  // 3rd parameter = body of the route (is async to use await in the body)
  async (req, res) => {
    // only for routes that accept data and need validation
    const errors = validationResult(req); //Checks request for errors
    // if there are errors return 404 (bad request) send json object with the errors inside
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if there are no errors
    const { name, email, password } = req.body; //destructure from the body of the request
    try {
      // finds a user in the database by the passed in email
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // if user is new use the User Schema and set a new user
      user = new User({
        name: name,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // prepare payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
