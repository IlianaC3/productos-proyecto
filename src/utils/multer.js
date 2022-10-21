const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");

// console.log("hace algo", process.cwd())

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public", "fotos"),
  filename: (_req, file, callback) => {
    const filename = uniqid(
      new Date().getTime(),
      file.originalname.toLowerCase().split(" ")
    );
    callback(null, filename);
  },
});

const upload = multer({
  storage: storage,
});


module.exports = upload