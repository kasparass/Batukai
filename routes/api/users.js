const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6, max: 40 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Se if user exist
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if admin
    if (config.get('admin') !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send('Success');
  } catch (err) {
    console.error(err.message);
    if (!err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
