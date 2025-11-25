// backend/middleware/errorHandler.js
const isDevelopment = process.env.NODE_ENV !== 'production';

// Custom error class
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

// Handle specific error types
const handleSequelizeError = (error) => {
    if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return new AppError(`Validation error: ${messages.join(', ')}`, 400);
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0]?.path || 'field';
        return new AppError(`${field} already exists`, 409);
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return new AppError('Referenced resource does not exist', 400);
    }

    return error;
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired. Please log in again.', 401);

// Send error response
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programming or unknown error: don't leak details
        console.error('ERROR ðŸ’¥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

// Global error handler
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (isDevelopment) {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        // Handle specific errors
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
        if (err.name?.startsWith('Sequelize')) error = handleSequelizeError(err);

        sendErrorProd(error, res);
    }
};

// 404 handler
const notFound = (req, res, next) => {
    const err = new AppError(`Cannot find ${req.originalUrl}`, 404);
    next(err);
};

// Async error wrapper
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    AppError,
    errorHandler,
    notFound,
    catchAsync,
};




