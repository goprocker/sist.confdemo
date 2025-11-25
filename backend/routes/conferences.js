// backend/routes/conferences.js
const express = require('express');
const router = express.Router();
const { Conference } = require('../models');
const { optionalAuth, authenticateToken, requireRole } = require('../middleware/auth');
const { catchAsync, AppError } = require('../middleware/errorHandler');
const { validate, schemas } = require('../middleware/validation');

// Get all conferences
router.get(
    '/',
    optionalAuth,
    catchAsync(async (req, res) => {
        const { status, limit = 50, offset = 0 } = req.query;

        const where = {};

        // Filter by status if provided
        if (status) {
            where.status = status;
        } else {
            // By default, only show published and ongoing conferences to non-admins
            if (!req.user || req.user.role !== 'admin') {
                where.status = ['published', 'ongoing'];
            }
        }

        const conferences = await Conference.findAll({
            where,
            order: [['date', 'ASC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const total = await Conference.count({ where });

        res.json({
            conferences,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
            },
        });
    })
);

// Get conference by ID
router.get(
    '/:id',
    optionalAuth,
    validate(schemas.idParam, 'params'),
    catchAsync(async (req, res) => {
        const conference = await Conference.findByPk(req.params.id, {
            include: ['registrations'],
        });

        if (!conference) {
            throw new AppError('Conference not found', 404);
        }

        // Hide draft conferences from non-admins
        if (conference.status === 'draft' && (!req.user || req.user.role !== 'admin')) {
            throw new AppError('Conference not found', 404);
        }

        // Get registered count
        const { Registration } = require('../models');
        const registeredCount = await Registration.count({
            where: {
                conferenceId: conference.id,
                status: 'confirmed',
            },
        });

        const response = conference.toJSON();
        response.registeredCount = registeredCount;
        response.availableSeats = conference.capacity - registeredCount;

        res.json({ conference: response });
    })
);

// Create conference (admin only)
router.post(
    '/',
    authenticateToken,
    requireRole('admin'),
    catchAsync(async (req, res) => {
        const conference = await Conference.create(req.body);
        res.status(201).json({
            message: 'Conference created successfully',
            conference,
        });
    })
);

// Update conference (admin only)
router.put(
    '/:id',
    authenticateToken,
    requireRole('admin'),
    validate(schemas.idParam, 'params'),
    catchAsync(async (req, res) => {
        const conference = await Conference.findByPk(req.params.id);

        if (!conference) {
            throw new AppError('Conference not found', 404);
        }

        await conference.update(req.body);

        res.json({
            message: 'Conference updated successfully',
            conference,
        });
    })
);

// Delete conference (admin only)
router.delete(
    '/:id',
    authenticateToken,
    requireRole('admin'),
    validate(schemas.idParam, 'params'),
    catchAsync(async (req, res) => {
        const conference = await Conference.findByPk(req.params.id);

        if (!conference) {
            throw new AppError('Conference not found', 404);
        }

        await conference.destroy();

        res.json({ message: 'Conference deleted successfully' });
    })
);

module.exports = router;


