exports.fileUploader = (req, res, next) => {
  // Check if the request is a multipart/form-data request
  if (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("multipart/form-data")
  ) {
    const upload = baseUploader.upload.single("file"); // Use the default uploader for all routes

    upload(req, res, (err) => {
      if (err) {
        console.error(`[Global Uploader] Error: ${err.message}`);
        return res.status(400).json({ message: err.message });
      }
      if (req.file) {
        console.info(`[Global Uploader] File Uploaded: ${req.file.filename}`);
      }
      next(); // Continue to the route handler
    });
  } else {
    next(); // Skip middleware for non-multipart requests
  }
};
