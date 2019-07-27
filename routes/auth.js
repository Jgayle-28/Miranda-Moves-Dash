const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//@route  GET  api/auth
//@desc   Get logged in user
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST  api/auth
//@desc   Auth a user & get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // only for routes that accept data and need validation
    const errors = validationResult(req); //Checks request for errors

    // if there are errors return 404 (bad request) send json object with the errors inside
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // if there are no errors
    const { email, password } = req.body; //destructure from the body of the request

    try {
      // Find a user
      let user = await User.findOne({ email: email });

      // If there is no user
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // If there is a user check and see if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      // If passwords dont match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Password' });
      }

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
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;