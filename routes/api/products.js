const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const bcrypt = require("bcrypt");
const moment = require("moment");
const joi = require("joi");

router.get("/get", async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.json({ data: allProducts });
  } catch (error) {
    return res.json({ error: "Get request Error" });
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    return res.json({ data: products });
  } catch (error) {
    return res.json({ error: "Get request Error" });
  }
});
router.get("/filter/:status", async (req, res) => {
  //enum:['Pending','Reviewing','Accepted','Rejected',"Sold"]
  try {
    const context = req.params.status;
    const products = await Product.find({ status: context });
    return res.json({ data: products });
  } catch (error) {
    return res.json({ error: "Get request Error" });
  }
});
router.get("/search/:minprice/:maxprice", async (req, res) => {
  //Only Works for approved products
  try {
    var min = req.params.minprice;
    var max = req.params.maxprice;
    if (min === "none" && max === "none") {
      // No Specfication
      const products = await Product.find({ status: "Pending" });
      if (products[0] === undefined) {
        return res.json({ data: "No results found." });
      } else {
        return res.json({ data: products });
      }
    }
    if (min === "none" && max >= 0) {
      // Only Max price is specified
      const products = await Product.find({
        $and: [{ price: { $lte: max } }, { status: "Pending" }]
      });
      if (products[0] === undefined) {
        return res.json({ data: "No results found." });
      } else {
        return res.json({ data: products });
      }
    }
    if (min >= 0 && max === "none") {
      // Only Minmimum price is specified
      const products = await Product.find({
        $and: [{ price: { $gte: min } }, { status: "Pending" }]
      });
      if (products[0] === undefined) {
        return res.json({ data: "No results found." });
      } else {
        return res.json({ data: products });
      }
    }
    if (min >= 0 && max >= 0) {
      // Both max and min are specified
      const products = await Product.find({
        $and: [
          { price: { $gte: min } },
          { price: { $lte: max } },
          { status: "Pending" }
        ]
      });
      if (products[0] === undefined) {
        return res.json({ data: "No results found." });
      } else {
        return res.json({ data: products });
      }
    }
  } catch (error) {
    return res.json({ error: "Get request Error" });
  }
});
router.post("/upload", async (req, res) => {
  //Assume Author ID until Authentication
  const author = "5d0e3e7d1e18990aa4dcd210";
  const date_posted = moment().format("MMMM Do YYYY, h:mm:ss a");
  const status = "Pending";
  const response_from_admin = [];
  const likes = 0;
  const validation = joi.validate(req.body, {
    title: joi
      .string()
      .min(5)
      .max(40)
      .required(),
    author: joi.allow(),
    price: joi.number().required(),
    description: joi
      .string()
      .min(20)
      .max(150),
    dimensions: joi.allow(),
    tags: joi.array().required()
  });
  if (validation.error) {
    return res.json({ error: validation.error.details[0] });
  }
  const { title, price, description, dimensions, tags } = req.body;
  const newProduct = new Product({
    title,
    price,
    author,
    description,
    dimensions,
    tags,
    date_posted,
    status,
    response_from_admin,
    likes
  })
    .save()
    .then(product => res.json({ data: product }))
    .catch(err => res.json({ error: err.message }));
});

module.exports = router;
