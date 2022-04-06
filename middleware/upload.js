const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({ url: process.env.url });

const upload = multer({
  storage: storage,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "img",
      };
    } else {
      return null;
    }
  },
});

exports.upload = upload;
exports.storage = storage;

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

// const filefilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: fileStorageEngine, fileFilter: filefilter });
