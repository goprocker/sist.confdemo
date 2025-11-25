// backend/middleware/validation.js
const Joi = require('joi');

// Validation middleware factory
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false, // Return all errors, not just the first one
            stripUnknown: true, // Remove unknown keys
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));

            return res.status(400).json({
                error: 'Validation failed',
                details: errors,
            });
        }

        // Replace request data with validated and sanitized data
        req[property] = value;
        next();
    };
};

// Common validation schemas
const schemas = {
    // User registration
    register: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .lowercase()
            .trim(),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                'string.min': 'Password must be at least 8 characters long',
            }),
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .trim(),
        affiliation: Joi.string()
            .min(2)
            .max(200)
            .required()
            .trim(),
    }),

    // User login
    login: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .lowercase()
            .trim(),
        password: Joi.string()
            .required(),
    }),

    // Password reset request
    passwordResetRequest: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .lowercase()
            .trim(),
    }),

    // Password reset
    passwordReset: Joi.object({
        token: Joi.string()
            .required(),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .required(),
    }),

    // Conference registration
    registration: Joi.object({
        conferenceId: Joi.number()
            .integer()
            .positive()
            .required(),
        specialRequests: Joi.string()
            .max(500)
            .optional()
            .allow(''),
    }),

    // Payment intent creation
    paymentIntent: Joi.object({
        registrationId: Joi.number()
            .integer()
            .positive()
            .required(),
        amount: Joi.number()
            .positive()
            .precision(2)
            .required(),
        currency: Joi.string()
            .length(3)
            .lowercase()
            .default('usd'),
    }),

    // ID parameter
    idParam: Joi.object({
        id: Joi.number()
            .integer()
            .positive()
            .required(),
    }),
};

// Sanitize HTML to prevent XSS
const sanitizeHtml = require('express-mongo-sanitize');

module.exports = {
    validate,
    schemas,
    sanitizeMiddleware: sanitizeHtml(),
};




