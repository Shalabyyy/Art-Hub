const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const Image = require("../../models/Media");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    SVGLinearGradientElement.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filefilter
});

router
  .route("/uploadmulter")
  .post(upload.single("imageData"), (req, res, next) => {
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });
    newImage
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({ success: true, document: result });
      })
      .catch(err => next(err));
  });

module.exports = router;
