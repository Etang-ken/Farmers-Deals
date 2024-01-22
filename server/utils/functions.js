const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require('crypto')

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

module.exports.storage = (destinationFolder, type) => {
  // const uniqueId = crypto.randomBytes(8).toString('hex'); 
  return multer.diskStorage({
    destination: function (req, file, cb) {
      createFolderIfNotExists(destinationFolder);
      cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${type}_${crypto.randomBytes(8).toString('hex')}_${Date.now()}${ext}`);
    },
  });
};
