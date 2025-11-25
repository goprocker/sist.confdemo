// backend/models/Registration.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Registration = sequelize.define('Registration', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        conferenceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'conferences',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            defaultValue: 'pending',
        },
        paymentStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
            defaultValue: 'pending',
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        specialRequests: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        confirmationCode: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        cancelledAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        cancellationReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'registrations',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'conferenceId'],
                name: 'unique_user_conference',
            },
        ],
    });

    // Instance methods
    Registration.prototype.generateConfirmationCode = function () {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    return Registration;
};




