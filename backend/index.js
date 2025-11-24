// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Placeholder routes (to be expanded)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conferences', require('./routes/conferences'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/payments', require('./routes/payments'));

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
