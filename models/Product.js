const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title:{
        type:String,
        required:true
        //Max 40 Characters, The Title of the product
    },
    //Images: Grid FS Object TODO
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        //References The Uploader
    },
    price:{
        type:Number,
        required:true
        //The Price of the product

    },
    description:{
        type:String,
        required:true
        //The description of the product, minimium 20 character, and maximum 150

    },
    dimensions:{
        type:String,
        required:false
        //The Dimensions of the artwork, The Formatting will be L x W x H Handled in FrontEnd
    },
    tags:{
        type:[String],
        required:true
        //The Tags (Keywords) That are going to be used in searching, will be entered by admin

    },
    likes:{
        type:Number,
        required:false
        //The Number of likes for a product, initally zero, a person can like a product once
    },
    date_posted:{
        type:String,
        required:true,
        // The Release Date of the Product, Will be in dd/mm/yyyy hh:mm a Moment library
    },
    status:{
        type:String,
        enum:['Pending','Reviewing','Accepted','Rejected',"Sold"],
        default:'Pending',
        required:false
        //This is the status state of the product
    },
    response_from_admin:[{
        //should always be sorted, display first object first in frontend
        response_id: Number,
        sent_by: String, //The Admin or The Seller
        text: String,   //message body
        date_sent: String //date of message
    }]
})

module.exports = Product = mongoose.model('Product', ProductSchema)