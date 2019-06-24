const express = require("express");
const router = express.Router();
const Product = require('../../models/Product')
const bcrypt = require('bcrypt');
const moment = require('moment')
const joi = require('joi')

router.get('/get',async (req,res)=>{
    try {
        const allProducts = await User.find()
        return res.json({data:allProducts})
    } catch (error) {
        return res.json({error:'Get request Error'})
    }
})
router.post('/upload',async (req,res)=>{
    //Assume Author ID until Authentication
    const author = '5d0e3e7d1e18990aa4dcd210'
    const date_posted = moment().format('MMMM Do YYYY, h:mm:ss a')
    const status = 'Pending'
    const response_from_admin = []
    const likes = 0
    const validation = joi.validate(req.body,{
        title:joi.string().min(5).max(40).required(),
        author:joi.allow(),
        price:joi.number().required(),
        description:joi.string().min(20).max(150),
        dimensions:joi.allow(),
        tags:joi.array().required()
    })
    if(validation.error){
        return res.json({error:validation.error.details[0]})
    }
    const {title,price,description,dimensions,tags}=req.body
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
    .then(product => res.json({data: product}))
    .catch(err => res.json({error: err.message}))
})





module.exports = router;