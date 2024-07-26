// Custom ErrorHandler class to create error instances with a status code
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Middleware to handle errors in the application
export const errorMiddleware = async (error, req, res, next) => {
  // Default error message and status code if not provided
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  // Handle specific error types
  if (error.name === "CastError") {
    const message = `Invalid: Resource not found: ${error.message}`;
    error = new ErrorHandler(message, 404);
  }

  // Send error response to the client
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
