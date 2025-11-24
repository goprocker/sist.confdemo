// backend/routes/registrations.js
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Mock registrations storage
const registrations = [];

// Validation schema
const registrationSchema = Joi.object({
    conferenceId: Joi.number().required(),
    userId: Joi.number().required(),
});

// Create registration
router.post('/:conferenceId/register', (req, res) => {
    try {
        const conferenceId = parseInt(req.params.conferenceId);
        const { userId } = req.body;

        const registration = {
            id: registrations.length + 1,
            userId,
            conferenceId,
            status: 'pending',
            registeredAt: new Date(),
        };

        registrations.push(registration);

        res.status(201).json({
            message: 'Registration created',
            registration,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user registrations
router.get('/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userRegistrations = registrations.filter(r => r.userId === userId);
    res.json({ registrations: userRegistrations });
});

module.exports = router;
