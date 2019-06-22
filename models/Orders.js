const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id:{
        type:mongoose.Types.ObjectId
    },
    ordered_by:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    total:{
        type:Number,
        required:true
        //This is the grand total of the Order
    },
    interest:{
        typer:Number
        //This will be ArtHub's Commsion
    },
    products:{
        type:[Object],
        required:true,
        //This will be an array of Products
    },
    address:{
        block:String,
        street:String,
        city: String,
        province:String,


    }
})

module.exports = Orders = mongoose.model('Orders', OrderSchema)