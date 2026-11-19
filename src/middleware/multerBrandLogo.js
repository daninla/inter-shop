import multer from "multer";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const uploadDirectory = fileURLToPath(
  new URL("../../uploads/brands/", import.meta.url),
);

mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadDirectory);
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
