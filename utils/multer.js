const multer = require("multer");
import * as fs from "fs";
import path from "path";

function createRoute(req) {
  const directory = path.join(__dirname, "..", "..", "public", "upload");
  req.body.fileUploadPath = path.join("uploads");
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(new Error("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const pictureMaxSize = 1 * 1000 * 1000; //300MB

export const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
});
