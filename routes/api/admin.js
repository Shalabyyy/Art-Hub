const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Vocab = require("../../models/Interest");
const Product = require("../../models/Product");
const bcrypt = require("bcrypt");
const moment = require("moment");
const joi = require("joi");

router.get("/get/skills", async (req, res) => {
  try {
    const skills = await Vocab.find({ type: "Skill" });
    return res.json({ data: skills });
  } catch (error) {
      console.log(error)
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
     return  res.json({eror:"Could Not Post a Skill"})
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
       return  res.json({eror:"Could Not Post a Interest"})
    }
  });
router.delete('/delete/:skill', async(req,res)=>{
    try {
        const skill = req.params.skill
        const message = await Vocab.remove({$and:[{name:skill},{type:'Skill'}]})
        if(message.deletedCount===0){
            return res.json({error:"The Skill does not exist"})
        }
        return res.json({message:skill+' Was Deleted'})
    } catch (error) {
        res.json({error:"Could not delete"})
    }
})  

module.exports = router;
