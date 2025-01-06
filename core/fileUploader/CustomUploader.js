const BaseUploader = require("./BaseUploader");

class CustomUploader extends BaseUploader {
  constructor() {
    super({
      allowedTypes: /zip|tar|gz/, // Allow compressed files
      fileSizeLimit: 50 * 1024 * 1024, // 50MB limit
      uploadDirectory: "./compressed-files", // Custom directory
    });
  }
}

module.exports = CustomUploader;
