const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

module.exports.storage = (destinationFolder, type) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      createFolderIfNotExists(destinationFolder);
      cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${type}_${Date.now()}${ext}`);
    },
  });
};
