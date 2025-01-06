const multer = require("multer");
const path = require("path");

class BaseFileUploader {
  constructor(options = {}) {
    this.allowedTypes = options.allowedTypes || /jpeg|jpg|png/; // Default to images
    this.fileSizeLimit = options.fileSizeLimit || 10 * 1024 * 1024; // Default 10MB
    this.uploadDirectory =
      options.uploadDirectory || path.join(__dirname, "..", "..", "uploads");
  }

  fileFilter(req, file, cb) {
    const mimeType = this.allowedTypes.test(file.mimetype);
    const extName = this.allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error(`Only files of types ${this.allowedTypes} are allowed.`));
  }

  getLimits() {
    return {
      fileSize: this.fileSizeLimit,
    };
  }

  get upload() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDirectory);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    });

    return multer({
      storage,
      fileFilter: this.fileFilter.bind(this),
      limits: this.getLimits(),
    });
  }
}

module.exports = BaseFileUploader;
