// backend/models/Conference.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Conference = sequelize.define('Conference', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
        },
        registrationFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        earlyBirdFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        earlyBirdDeadline: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled'),
            defaultValue: 'draft',
        },
        registrationOpen: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topics: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    }, {
        tableName: 'conferences',
        timestamps: true,
    });

    // Instance methods
    Conference.prototype.hasAvailableSeats = async function () {
        const Registration = sequelize.models.Registration;
        const count = await Registration.count({
            where: {
                conferenceId: this.id,
                status: 'confirmed',
            },
        });
        return count < this.capacity;
    };

    Conference.prototype.getCurrentFee = function () {
        if (this.earlyBirdFee && this.earlyBirdDeadline) {
            if (new Date() < new Date(this.earlyBirdDeadline)) {
                return this.earlyBirdFee;
            }
        }
        return this.registrationFee;
    };

    return Conference;
};




