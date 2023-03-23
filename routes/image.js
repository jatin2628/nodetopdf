const express = require('express');
const imageController = require('../controller/image');
const multer = require('multer');

const router = express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}-${Date.now()}.jpg`);
    },
  });

  const upload = multer({
    storage:multerStorage
  });

  router.post('/image',upload.array('url'),imageController.createImage);
//   router.post('/login',authvalid.validLogin,authvalidresult,userController.login);


module.exports = router;