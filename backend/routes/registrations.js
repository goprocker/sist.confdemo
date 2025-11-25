// backend/routes/registrations.js
const express = require('express');
const router = express.Router();
const { Registration, Conference, User } = require('../models');
const { authenticateToken, requireOwnershipOrAdmin } = require('../middleware/auth');
const { registrationLimiter } = require('../middleware/rateLimit');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, AppError } = require('../middleware/errorHandler');

// Create registration
router.post(
    '/',
    authenticateToken,
    registrationLimiter,
    validate(schemas.registration),
    catchAsync(async (req, res) => {
        const { conferenceId, specialRequests } = req.body;
        const userId = req.user.userId;

        // Check if conference exists
        const conference = await Conference.findByPk(conferenceId);
        if (!conference) {
            throw new AppError('Conference not found', 404);
        }

        // Check if conference registration is open
        if (!conference.registrationOpen) {
            throw new AppError('Registration is not open for this conference', 400);
        }

        // Check if conference has available seats
        const hasSeats = await conference.hasAvailableSeats();
        if (!hasSeats) {
            throw new AppError('Conference is at full capacity', 400);
        }

        // Check for duplicate registration
        const existingRegistration = await Registration.findOne({
            where: { userId, conferenceId },
        });

        if (existingRegistration) {
            throw new AppError('You are already registered for this conference', 409);
        }

        // Get current fee (early bird or regular)
        const amount = conference.getCurrentFee();

        // Create registration
        const registration = await Registration.create({
            userId,
            conferenceId,
            status: 'pending',
            paymentStatus: 'pending',
            amount,
            specialRequests,
        });

        // Include conference details in response
        const result = await Registration.findByPk(registration.id, {
            include: [
                {
                    model: Conference,
                    as: 'conference',
                    attributes: ['id', 'title', 'date', 'venue', 'registrationFee'],
                },
            ],
        });

        res.status(201).json({
            message: 'Registration created successfully',
            registration: result,
        });
    })
);

// Get user registrations
router.get(
    '/user/:userId',
    authenticateToken,
    requireOwnershipOrAdmin('userId'),
    catchAsync(async (req, res) => {
        const userId = parseInt(req.params.userId);

        const registrations = await Registration.findAll({
            where: { userId },
            include: [
                {
                    model: Conference,
                    as: 'conference',
                    attributes: ['id', 'title', 'date', 'venue', 'imageUrl'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        res.json({ registrations });
    })
);

// Get single registration
router.get(
    '/:id',
    authenticateToken,
    validate(schemas.idParam, 'params'),
    catchAsync(async (req, res) => {
        const registration = await Registration.findByPk(req.params.id, {
            include: [
                {
                    model: Conference,
                    as: 'conference',
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'affiliation'],
                },
            ],
        });

        if (!registration) {
            throw new AppError('Registration not found', 404);
        }

        // Verify user owns this registration or is admin
        if (registration.userId !== req.user.userId && req.user.role !== 'admin') {
            throw new AppError('Access denied', 403);
        }

        res.json({ registration });
    })
);

// Cancel registration
router.delete(
    '/:id',
    authenticateToken,
    validate(schemas.idParam, 'params'),
    catchAsync(async (req, res) => {
        const registration = await Registration.findByPk(req.params.id);

        if (!registration) {
            throw new AppError('Registration not found', 404);
        }

        // Verify user owns this registration or is admin
        if (registration.userId !== req.user.userId && req.user.role !== 'admin') {
            throw new AppError('Access denied', 403);
        }

        // Check if already cancelled
        if (registration.status === 'cancelled') {
            throw new AppError('Registration is already cancelled', 400);
        }

        // Check if payment has been made
        if (registration.paymentStatus === 'paid') {
            throw new AppError(
                'Cannot cancel a paid registration. Please contact support for refunds.',
                400
            );
        }

        // Cancel registration
        await registration.update({
            status: 'cancelled',
            cancelledAt: new Date(),
            cancellationReason: req.body.reason || null,
        });

        res.json({
            message: 'Registration cancelled successfully',
            registration,
        });
    })
);

// Get conference registrations (admin only)
router.get(
    '/conference/:conferenceId',
    authenticateToken,
    catchAsync(async (req, res) => {
        // Only admins can view all registrations for a conference
        if (req.user.role !== 'admin') {
            throw new AppError('Only admins can view conference registrations', 403);
        }

        const conferenceId = parseInt(req.params.conferenceId);

        const registrations = await Registration.findAll({
            where: { conferenceId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'affiliation'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        res.json({ registrations });
    })
);

module.exports = router;


