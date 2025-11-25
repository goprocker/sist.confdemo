// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '15m'; // Short-lived access token
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Long-lived refresh token

// Generate access token
const generateAccessToken = (userId, email, role) => {
    return jwt.sign(
        { userId, email, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId, type: 'refresh' },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
};

// Verify JWT token middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // Prevent refresh tokens from being used as access tokens
        if (decoded.type === 'refresh') {
            return res.status(401).json({ error: 'Invalid token type' });
        }

        // Attach user info to request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded.type !== 'refresh') {
                req.user = {
                    userId: decoded.userId,
                    email: decoded.email,
                    role: decoded.role,
                };
            }
        }
    } catch (error) {
        // Silently fail - authentication is optional
    }
    next();
};

// Role-based authorization middleware
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                required: allowedRoles,
                current: req.user.role,
            });
        }

        next();
    };
};

// Verify user owns resource or is admin
const requireOwnershipOrAdmin = (userIdField = 'userId') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const resourceUserId = req.params[userIdField] || req.body[userIdField];

        if (req.user.role === 'admin' || req.user.userId === parseInt(resourceUserId)) {
            return next();
        }

        return res.status(403).json({ error: 'Access denied' });
    };
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
    optionalAuth,
    requireRole,
    requireOwnershipOrAdmin,
};




