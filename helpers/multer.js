const path = require("path");
const multer = require("multer");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now());
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.includes("images") ||
      file.mimetype.includes("application")
    ) {
      cb(null, true);
      return;
    }
    cb(null, false);

    // cb(new Error("I don't have a clue!"));
    // Вы можете всегда вернуть ошибку, если что-то пошло не так:
  },
});
module.exports = upload;
