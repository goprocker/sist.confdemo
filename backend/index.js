// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection, sequelize } = require('./config/database');
const { syncDatabase } = require('./models');
const { apiLimiter } = require('./middleware/rateLimit');
const { sanitizeMiddleware } = require('./middleware/validation');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    },
}));

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Request logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Sanitize inputs
app.use(sanitizeMiddleware);

// Rate limiting
app.use('/api/', apiLimiter);

// Health check (before other routes)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: sequelize ? 'connected' : 'disconnected',
    });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conferences', require('./routes/conferences'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/payments', require('./routes/payments'));

// 404 handler
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
    try {
        // Test database connection
        const connected = await testConnection();

        if (connected) {
            // Sync database (creates tables if they don't exist)
            await syncDatabase();
            console.log('âœ“ Database models synchronized');
        } else {
            console.warn('âš  Server starting without database connection');
        }

        app.listen(PORT, () => {
            console.log(`âœ“ Backend server listening on port ${PORT}`);
            console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`  CORS origin: ${corsOptions.origin}`);
        });
    } catch (error) {
        console.error('âœ— Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;




