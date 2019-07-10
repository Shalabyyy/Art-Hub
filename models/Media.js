const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require("multer");

var ImageSchema = new Schema({
  imageName: { 
      type:String,
      default:'none',
      required:true
    },
    imageData:{
        type:String,
        required:true
    }
});
var Item = mongoose.model("ImageTest", ImageSchema);

module.exports = Item