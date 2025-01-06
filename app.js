const express = require("express");

const { fileUploader } = require("./middlewares/fileUploaderMiddleware");

const userRoutes = require("./routes/userRoutes");
const { globalErrorHandler } = require("./core/ErrorHandler");

const app = express();

app.use(express.json());

app.use(fileUploader);

app.use("/api/users", userRoutes);

app.use(globalErrorHandler);

module.exports = app;
