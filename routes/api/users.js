const express = require("express");
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcrypt');
const moment = require('moment')
const joi = require('joi')

router.get('/get',async (req,res)=>{
    try {
        const allUsers = await User.find()
        return res.json({data:allUsers})
    } catch (error) {
        return res.json({error:'Get request Error'})
    }
})
router.get('/get/:id',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        return res.json({data:user})
    } catch (error) {
        return res.json({error:'Get request Error'})
    }
})
router.get('/getUser/:username',async (req,res)=>{
    try {
        const uname= req.params.username
        const user = await User.findOne({username:uname})
        return res.json({data:user})
    } catch (error) {
        
        return res.json({error:'Get request Error'})
    }
})
router.post('/register', async (req,res)=>{
    date_joined = moment().format('MMMM Do YYYY, h:mm:ss a')
    sellerprofile = [] //Except if the account is a subset of seller
    cart = []
    const status = joi.validate(req.body,{
        type:joi.array().required(),
        email:joi.string().required(),
        username: joi.string().required(),
        name: joi.string().required(),
        password:joi.string().required() ,
        date_of_birth: joi.string().required(),
        interests:joi.array().required(),
        SellerProfile: joi.allow()
    })
    if(status.error){
        return res.json({error:status.error.details[0]})
    }
    const{type,name,email,username,password,date_of_birth,interests}= req.body
    
    const useremail = await User.findOne({email})
    const usernamef = await User.findOne({username})
    if(useremail||usernamef){
      if(useremail)
       return res.status(400).json({error: 'Email already exists'})
       else 
       return res.status(400).json({error: 'username already exists'})

      }
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password,salt)
      if(type[0]==='B'){
          console.log('Creating buyer account...')
          const SellerProfile={
            previous_work:[],
            status:'',
            response_from_admin:[],
            about:'',
            linkedin:'',
            portfolio:''
        }
          const Buyer= new User({
              type,
              date_joined,
              name,
              email,
              password:hashedPassword,
              username:username.toLowerCase(),
              date_of_birth,
              interests,
              cart,
              SellerProfile
          })
          .save()
          .then(user => res.json({data: user}))
          .catch(err => res.json({error: err.message}))
       
      }  
      if(type[0]==='S'){
        type.push('B')
        const {about,linkedin,portfolio}  = req.body.SellerProfile
        const SellerProfile={
            previous_work:[],
            status:'Pending',
            response_from_admin:[],
            about:about,
            linkedin:linkedin,
            portfolio:portfolio
        }
        console.log('Creating seller account...')
           const Seller = new User({
            type,
            date_joined,
            name,
            email,
            password:hashedPassword,
            username:username.toLowerCase(),
            date_of_birth,
            interests,
            cart,
            SellerProfile
            
        })
        .save()
        .then(user => res.json({data: user}))
        .catch(err => res.json({error: err.message}))
       }  

})



module.exports = router;