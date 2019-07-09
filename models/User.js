const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    type: {
        type:[String],
        enum:['B','S','A'],
        required:true
        //This Will be thet type of the account; Buyer, Seller and Admin respectivley
    },
    phone:{
        type:String,
        required:true
    },
    //profile picture: Grid FS Object TODO
    name: {
        type:String,
        required:true
        //First + last name of the User
    },
    email:{
        type:String,
        required:true,
        unique:true
        //Email of the USer, it is Unique
    },
    username:{
        type:String,
        required:true,
        unique:true,
        //Each User has a unique user name, 4-25 characters
    },
    password:{
        type:String,
        required:true,
        //Passwords are at least 8 characters and Must have an uppercase, lowercase and special characters
    },
    date_of_birth:{
        type:String,
        required:false
        //Not needed much, but wil br handeledd in moment
    },
    interests:{
        type:[String],
        required:true,
        // This will help view recommended Products based on tags, will be entered by admin
    },
    date_joined:{
        type:String,
        required:true,
        //This will be the Date the account was created
    },
    SellerProfile:{
        about: String,              //Quick Summary of the profile, mimium 20 characters and maximum 150
        previous_work: [Object],    //Array of Product.JS objects
        portfolio: String,          //Url of the portfolio
        linkedin: String,           //Url/user name of Linkedin profile
        status:String,             // enum of ['Pending','Accepted','Reviewing','Rejected']
        response_from_admin:[{
            //should always be sorted, display first object first in frontend
            response_id: Number,
            sent_by: String, //The Admin or The Seller
            text: String,   //message body
            date_sent: String //date of message
        }]
    },
    cart:{
        type:[Object],
        required: false,
        default:[],
        //This is an Array of Object from Product.js
    }



})

module.exports = User = mongoose.model('User', UserSchema)