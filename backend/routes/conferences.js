// backend/routes/conferences.js
const express = require('express');
const router = express.Router();

// Mock conference data
const conferences = [
    {
        id: 1,
        title: 'International Conference on AI 2025',
        description: 'Leading conference on artificial intelligence and machine learning',
        startDate: '2025-06-15',
        endDate: '2025-06-17',
        location: 'San Francisco, CA',
        price: 299,
        capacity: 500,
    },
    {
        id: 2,
        title: 'Web Development Summit 2025',
        description: 'Latest trends in web development and frameworks',
        startDate: '2025-07-20',
        endDate: '2025-07-22',
        location: 'New York, NY',
        price: 199,
        capacity: 300,
    },
];

// Get all conferences
router.get('/', (req, res) => {
    res.json({ conferences });
});

// Get conference by ID
router.get('/:id', (req, res) => {
    const conference = conferences.find(c => c.id === parseInt(req.params.id));
    if (!conference) {
        return res.status(404).json({ error: 'Conference not found' });
    }
    res.json({ conference });
});

module.exports = router;
