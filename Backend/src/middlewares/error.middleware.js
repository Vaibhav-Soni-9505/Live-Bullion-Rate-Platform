const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("API Error:", {
    message: err.message,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 502
        ? "Gold rate provider is currently unavailable"
        : statusCode === 504
          ? "Gold rate provider request timed out"
          : statusCode === 500
            ? "Internal server error"
            : err.message,
  });
};

export default errorHandler;
