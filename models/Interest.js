const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InterestSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        enum:['Skill','Interest'],
        type:String,
        required:true
    }
})

module.exports = Interest = mongoose.model('Interest', InterestSchema)