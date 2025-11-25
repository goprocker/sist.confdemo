// backend/models/Payment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        registrationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'registrations',
                key: 'id',
            },
        },
        razorpayOrderId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        razorpayPaymentId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        razorpaySignature: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'INR',
        },
        status: {
            type: DataTypes.ENUM(
                'created',
                'attempted',
                'paid',
                'failed',
                'refunded'
            ),
            defaultValue: 'created',
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // ... (other fields can remain or be removed as needed, keeping it simple for now)
        metadata: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },
        errorMessage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'payments',
        timestamps: true,
        indexes: [
            {
                fields: ['razorpayOrderId'],
            },
            {
                fields: ['registrationId'],
            },
            {
                fields: ['status'],
            },
        ],
    });

    return Payment;
};




