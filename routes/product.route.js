// logic app registration
// import express
const { Router } = require("express");
// create object
const router = Router();
// import schema user from models
const User = require("../models/User");
// import schema product from models
const Product = require("../models/Product");
// import express-validator
const { check, validationResult } = require("express-validator");

router.post(
  "/addProduct",
  // connect middleware
  [
    check("title", "empty").isLength({ min: 1 }),
    check("price", "empty").isLength({ min: 1 }),
    check("color", "empty").isLength({ min: 1 }),
    check("img", "empty").isLength({ min: 1 }),
    check("category", "empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);
      // error checking
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data registration",
        });
      }

      const { title, price, color, img, category } = req.body;

      // create new product
      const product = new Product({
        titleProduct: title,
        priceProduct: price,
        colorProduct: color,
        imgNameProduct: img,
        category: category,
      });

      // save new product in back (await - work with bd)
      await product.save();

      // response message in back
      res.status(201).json({ message: "Product is created" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/addProductCart", async (req, res) => {
  try {
    const user = await User.find({ _id: req.body.userId }).update({
      $push: { cart: req.body.idProduct },
    });
    res.json({ message: "Added to cart" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/addProductWishlist", async (req, res) => {
  try {
    const user = await User.find({ _id: req.body.userId }).update({
      $push: { washlist: req.body.idProduct },
    });
    res.json({ message: "Added to wishlist" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const product = await Product.find({ category: req.query.category }).limit(
      Number(req.query.limit)
    );
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getProductFromCart", async (req, res) => {
  try {
    await User.findOne({ _id: req.query.userId })
      .then(function (user) {
        const productsFind = [];
        user.cart.forEach(function (item) {
          productsFind.push(Product.findOne({ _id: item }));
        });
        return Promise.all(productsFind);
      })
      .then(function (list) {
        res.json(list);
      })
      .catch(function (error) {
        res.status(500).send("one of the queries failed", error);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getProductFromWishlist", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId })
      .then(function (user) {
        const productsFind = [];
        user.washlist.forEach(function (item) {
          productsFind.push(Product.findOne({ _id: item }));
        });
        return Promise.all(productsFind);
      })
      .then(function (list) {
        res.json(list);
      })
      .catch(function (error) {
        res.status(500).send("one of the queries failed", error);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/removeProductCart", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { cart: req.body.idProduct } }
    )
      .then(function (user) {
        res.json(user);
      })
      .catch(function (error) {
        res.status(500).send("one of the queries failed", error);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/removeProductWishlist", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { washlist: req.body.idProduct } }
    )
      .then(function (user) {
        res.json(user);
      })
      .catch(function (error) {
        res.status(500).send("one of the queries failed", error);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
