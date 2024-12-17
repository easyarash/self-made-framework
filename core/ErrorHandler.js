class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.isOperational ? err.message : "Internal Server Error",
  });
};

module.exports = { AppError, globalErrorHandler };
