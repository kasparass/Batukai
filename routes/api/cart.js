const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');
const User = require('../../models/User');

// @route    GET api/cart
// @desc     Get cart with products
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    POST api/cart
// @desc     Add products to cart
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      // Create cart and add product
      cart = new Cart({
        user: req.user.id,
        items: [
          {
            product: req.body.product,
          },
        ],
      });
      await cart.save();
      return res.json(cart);
    }
    // Add product to cart
    cart.items.unshift({ product: req.body.product });
    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    DELETE api/cart/:id
// @desc     Delete product from the cart
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }

    if (
      cart.items.filter((product) => product.id.toString() === req.params.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'There is no product to delete for this cart' });
    }

    removeIndex = cart.items
      .map((product) => product.id.toString())
      .indexOf(req.params.id);

    cart.items.splice(removeIndex, 1);
    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
