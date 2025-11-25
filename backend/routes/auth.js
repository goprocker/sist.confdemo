// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { User } = require('../models');
const { validate, schemas } = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimit');
const { catchAsync, AppError } = require('../middleware/errorHandler');
const {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
} = require('../middleware/auth');

// Register endpoint
router.post(
    '/register',
    authLimiter,
    validate(schemas.register),
    catchAsync(async (req, res) => {
        const { email, password, name, affiliation } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new AppError('User already exists', 409);
        }

        // Generate email verification token
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // Create user (password will be hashed by model hook)
        const user = await User.create({
            email,
            passwordHash: password, // Will be hashed by beforeCreate hook
            name,
            affiliation,
            role: 'faculty',
            emailVerificationToken,
        });

        // TODO: Send verification email
        console.log(`Verification token for ${email}: ${emailVerificationToken}`);

        res.status(201).json({
            message: 'User registered successfully. Please verify your email.',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                emailVerified: user.emailVerified,
            },
        });
    })
);

// Login endpoint
router.post(
    '/login',
    authLimiter,
    validate(schemas.login),
    catchAsync(async (req, res) => {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Check if account is locked
        if (user.isLocked()) {
            const lockMinutes = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60));
            throw new AppError(
                `Account is locked due to too many failed login attempts. Try again in ${lockMinutes} minutes.`,
                423
            );
        }

        // Verify password
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            await user.incrementLoginAttempts();
            throw new AppError('Invalid credentials', 401);
        }

        // Reset login attempts on successful login
        await user.resetLoginAttempts();

        // Generate tokens
        const accessToken = generateAccessToken(user.id, user.email, user.role);
        const refreshToken = generateRefreshToken(user.id);

        // Save refresh token
        await user.update({ refreshToken });

        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                emailVerified: user.emailVerified,
            },
        });
    })
);

// Refresh token endpoint
router.post(
    '/refresh',
    catchAsync(async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError('Refresh token required', 400);
        }

        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

        try {
            const decoded = jwt.verify(refreshToken, JWT_SECRET);

            if (decoded.type !== 'refresh') {
                throw new AppError('Invalid token type', 401);
            }

            // Find user and verify refresh token
            const user = await User.findByPk(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                throw new AppError('Invalid refresh token', 401);
            }

            // Generate new access token
            const accessToken = generateAccessToken(user.id, user.email, user.role);

            res.json({ accessToken });
        } catch (error) {
            throw new AppError('Invalid or expired refresh token', 401);
        }
    })
);

// Password reset request
router.post(
    '/password-reset-request',
    authLimiter,
    validate(schemas.passwordResetRequest),
    catchAsync(async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Don't reveal if user exists
            return res.json({
                message: 'If the email exists, a password reset link has been sent.',
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await user.update({
            passwordResetToken: resetToken,
            passwordResetExpires: resetExpires,
        });

        // TODO: Send reset email
        console.log(`Reset token for ${email}: ${resetToken}`);

        res.json({
            message: 'If the email exists, a password reset link has been sent.',
        });
    })
);

// Password reset
router.post(
    '/password-reset',
    authLimiter,
    validate(schemas.passwordReset),
    catchAsync(async (req, res) => {
        const { token, password } = req.body;

        const user = await User.findOne({
            where: {
                passwordResetToken: token,
            },
        });

        if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
            throw new AppError('Invalid or expired reset token', 400);
        }

        // Update password (will be hashed by model hook)
        await user.update({
            passwordHash: password,
            passwordResetToken: null,
            passwordResetExpires: null,
            loginAttempts: 0,
            lockUntil: null,
        });

        res.json({ message: 'Password reset successful' });
    })
);

// Get current user
router.get(
    '/me',
    authenticateToken,
    catchAsync(async (req, res) => {
        const user = await User.findByPk(req.user.userId, {
            attributes: { exclude: ['passwordHash', 'passwordResetToken', 'refreshToken'] },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.json({ user });
    })
);

// Logout
router.post(
    '/logout',
    authenticateToken,
    catchAsync(async (req, res) => {
        const user = await User.findByPk(req.user.userId);
        if (user) {
            await user.update({ refreshToken: null });
        }

        res.json({ message: 'Logged out successfully' });
    })
);

module.exports = router;


