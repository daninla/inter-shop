import multer from "multer";
import { staticPath } from "../config/staticPath.js";
import { mkdir } from "node:fs";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    mkdir(staticPath, { recursive: true }, (error) => callback(error, staticPath));
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});

const fileFilter = (req, file, callback) => {
  const MIMETYPE_REGEX = /^image\/(jpeg|png|webp)$/i;
  if (MIMETYPE_REGEX.test(file.mimetype)) {
    return callback(null, true);
  }
  callback(null, false);
};

const multerBrandLogo = multer({
  storage,
  fileFilter,
});

export default multerBrandLogo;
