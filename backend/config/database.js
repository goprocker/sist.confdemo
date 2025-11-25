// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const isDevelopment = process.env.NODE_ENV !== 'production';

// Database configuration
const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgresql://localhost:5432/conference_db',
    {
        dialect: 'postgres',
        logging: isDevelopment ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false,
            } : false,
        },
    }
);

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('âœ“ Database connection established successfully');
        return true;
    } catch (error) {
        console.error('âœ— Unable to connect to database:', error.message);
        return false;
    }
};

module.exports = { sequelize, testConnection };




