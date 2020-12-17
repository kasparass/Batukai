const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Product = require('../../models/Product');

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').notEmpty(),
      check('title', 'Title is required').notEmpty(),
      check('price', 'Price is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(user);

      const newProduct = new Product({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        title: req.body.title,
        price: req.body.price,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/product/:id
// @desc     Get product by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (!err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/product/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (!err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route    PUT api/products/like/:id
// @desc     Like a product
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    // Check if the product has already been liked by user
    if (
      products.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Product already liked' });
    }

    products.likes.unshift({ user: req.user.id });
    await products.save();
    res.json(products.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/products/unlike/:id
// @desc     Like a product
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if the product has already been liked by user
    if (
      product.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Product has not yet been liked' });
    }

    // Get remove index
    removeIndex = product.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    product.likes.splice(removeIndex, 1);

    await product.save();
    res.json(product.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/products/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const product = await Product.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };
      product.comments.unshift(newComment);
      await product.save();
      res.json(product.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/products/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    //Pull out comment
    const comment = product.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    removeIndex = product.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    product.comments.splice(removeIndex, 1);

    await product.save();
    res.json(product.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
