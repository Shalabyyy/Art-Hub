const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Vocab = require("../../models/Interest");
const Product = require("../../models/Product");
const bcrypt = require("bcrypt");
const moment = require("moment");
const joi = require("joi");

//Skills and Interests
router.get("/get/skills", async (req, res) => {
  try {
    const skills = await Vocab.find({ type: "Skill" });
    return res.json({ data: skills });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Get request Error" });
  }
});
router.get("/get/interests", async (req, res) => {
  try {
    const interests = await Vocab.find({ type: "Interest" });
    return res.json({ data: interests });
  } catch (error) {
    return res.json({ error: "Get request Error" });
  }
});
router.post("/add/skill", async (req, res) => {
  try {
    const skill = req.body.skill;
    const exist = await Vocab.findOne({ name: skill });
    if (exist) {
      return res.json({ error: "Skill " + exist.name + " Already Exists" });
    }
    const newSkill = new Vocab({
      type: "Skill",
      name: skill
    })
      .save()
      .then(skillz => res.json({ data: skillz }))
      .catch(err => res.json({ error: err.message }));
  } catch (error) {
    return res.json({ eror: "Could Not Post a Skill" });
  }
});
router.post("/add/interest", async (req, res) => {
  try {
    const skill = req.body.interest;
    const exist = await Vocab.findOne({ name: skill });
    if (exist) {
      return res.json({ error: "Interest " + exist.name + " Already Exists" });
    }
    const newInterest = new Vocab({
      type: "Interest",
      name: skill
    })
      .save()
      .then(skillz => res.json({ data: skillz }))
      .catch(err => res.json({ error: err.message }));
  } catch (error) {
    return res.json({ eror: "Could Not Post a Interest" });
  }
});
router.delete("/delete/:skill", async (req, res) => {
  try {
    const skill = req.params.skill;
    const message = await Vocab.remove({
      $and: [{ name: skill }, { type: "Skill" }]
    });
    if (message.deletedCount === 0) {
      return res.json({ error: "The Skill does not exist" });
    }
    return res.json({ message: skill + " Was Deleted" });
  } catch (error) {
    res.json({ error: "Could not delete" });
  }
});
//Product Control
router.put("/markAs", async (req, res) => {
  //enum:['Pending','Reviewing','Accepted','Rejected',"Sold"]
  try {
    const validation = joi.validate(req.body, {
      _id: joi
        .string()
        .length(24)
        .required(),
      state: joi.string().required(),
      reply: joi.any()
    });
    if (validation.error) {
      return res.json({ error: validation.error.details[0] });
    }
    const id = req.body._id;
    const setTo = req.body.state;
    const product = await Product.findById(id);
    if (product.status === "Accepting" || product.status === "Rejected") {
      return res.json({
        error: "You can not ammend an Accepted or a Reject Product"
      });
    }
    //console.log(product)
    if (setTo === "Accepted") {
      const update = await Product.update(
        { _id: id },
        {
          $set: {
            status: "Accepted"
          }
        }
      );
      // Notify The User That his Product was Accepted Via Email
      console.log(update);
      return res.json({ data: update });
    } else if (setTo === "Rejected") {
      const update = await Product.findOneAndUpdate(
        { _id: id },
        { status: "Rejected" }
      );
      return res.json({ data: update });
      //Notify the User that The Product Was Accepted Via Email
    } else if (setTo === "Reviewing") {
      //tell The User the requested Changed Via email
      if (req.body.reply === "") {
        return res.json({ error: "You NEED to provide a feedback Message!" });
      }
      const reply = {
        response_id: product.response_from_admin.length + 1,
        sent_by: "Admin", //The Admin or The Seller
        text: req.body.reply, //message body
        date_sent: moment().format("MMMM Do YYYY, h:mm:ss a") //date of message
      };
      console.log(reply.response_id);
      const update = await Product.findOneAndUpdate(
        { _id: id },
        { status: "Reviewing", $push: { response_from_admin: reply } },
        { useFindAndModify: true }
      );
      return res.json({ data: update });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "PUT request error" });
  }
});
// Account Control
router.put("/Approve", async (req, res) => {
  try {
    const validation = joi.validate(req.body, {
      id: joi.string().length(24),
      setTo: joi.string().allow(),
      message: joi.string().allow()
    });
    if (validation.error) {
      return res.json({ error: validation.error });
    }
    const setTo = req.body.setTo;
    const message = req.body.message;
    const id = req.body.id;
    const user = await User.findById(id);
    if (user.type[0] === "S") {
      if (user.SellerProfile.status === "Accepted") {
        return res.json({ error: "This user is already accepted!" });
      }
      if (
        !(setTo === "Accepted" || setTo === "Reviewing" || setTo === "Rejected")
      ) {
        console.log(user.SellerProfile);
        return res.json({ error: "The state is not defined" });
      } else {
        if (
          (user.SellerProfile.status === "Pending" ||
            user.SellerProfile.status === "Reviewing") &&
          setTo === "Accepted"
        ) {
          const update = await User.update(
            { _id: id },
            {
              $set: {
                SellerProfile: {
                  status: "Accepted",
                  about: user.SellerProfile.about, //Quick Summary of the profile, mimium 20 characters and maximum 150
                  previous_work: user.SellerProfile.previous_work, //Array of Product.JS objects
                  portfolio: user.SellerProfile.portfolio, //Url of the portfolio
                  linkedin: user.SellerProfile.linkedin,
                  response_from_admin: user.SellerProfile.response_from_admin
                }
              }
            }
          );
          return res.json({ data: update });
        }
        if (
          (user.SellerProfile.status === "Pending" ||
            user.SellerProfile.status === "Reviewing") &&
          setTo === "Reviewing"
        ) {
          const reply = {
            //should always be sorted, display first object first in frontend
            response_id: user.SellerProfile.response_from_admin.length + 1,
            sent_by: "Admin", //The Admin or The Seller
            text: message, //message body
            date_sent: moment().format("MMMM Do YYYY, h:mm:ss a") //date of message
          };
          console.log(reply)
          
          const update = await User.findOneAndUpdate(
            { _id: id },
            { status: "Reviewing", SellerProfile:{$push: { response_from_admin: reply }} },
            { useFindAndModify: true }
          );
          return res.json({ data: update });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "PUT request error" });
  }
});

module.exports = router;
